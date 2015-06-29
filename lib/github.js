var gh = require('./github-as-promised')({version: "3.0.0"});
var Promise = require('bluebird');

gh.authenticate({
  type: 'oauth',
  token: require('../github.auth.json')
});

function getAllRepos (user) {
  var allRepos = [];

  function handleRepos(repos) {
    allRepos.push.apply(allRepos, repos.filter(function (repo) {
      return repo.fork === false;
    }));

    if(gh.hasNextPage(repos)){
      return gh.getNextPageAsync(repos).then(handleRepos);
    }

    return allRepos;
  }

  return gh.repos.getFromUserAsync({user:user, per_page:100}).then(handleRepos);
}

function getAllRepoNames(user) {
  return getAllRepos(user).map(function(repo){
    return repo.name;
  });
}

function getAllReposWithPackage (user) {
  return getAllRepos(user)
    .then(function (repos) {
      return Promise.settle(repos.map(function (repo) {
        return gh.repos.getContentAsync({
          user:user,
          repo:repo.name,
          ref:repo.default_branch,
          path:'package.json'
        }).then(function (pkgResponse) {
          return {
            repo: repo,
            pkgResponse: pkgResponse,
            pkg: JSON.parse(new Buffer(pkgResponse.content, pkgResponse.encoding).toString('utf8'))
          };
        });
      }));
    })
    .filter(function (state) {
      return state.isFulfilled() && state.value();
    })
    .map(function (state) {
      return state.value();
    });
}

function getNameOfAllReposWithPackage (user) {
  return getAllReposWithPackage(user).map(function (result) {
    return result.repo.name;
  });
}

module.exports = {
  getAllRepos: getAllRepos,
  getAllRepoNames: getAllRepoNames,
  getAllReposWithPackage: getAllReposWithPackage,
  getNameOfAllReposWithPackage: getNameOfAllReposWithPackage
};