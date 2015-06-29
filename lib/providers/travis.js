module.exports = travis;

function travis(data) {
  var user = data.gh.org || data.gh.user;
  var repo = data.gh.repo;
  var imgUrl = 'https://travis-ci.org/' + user + '/' + repo + '.svg';

  if (data.gh.default_branch) {
    imgUrl += '?branch=' + data.gh.default_branch;
  }

  return {
    altText: 'Build Status',
    linkUrl: 'https://travis-ci.org/' + user + '/' + repo,
    imageUrl: imgUrl
  };
}



