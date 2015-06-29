var GitHubApi = require('github');
var bluebird = require('bluebird');

function create(opts) {
  if (!(opts instanceof GitHubApi)){
    opts = new GitHubApi(opts);
  }
  bluebird.promisifyAll(opts);
  for (var i in opts){
    if('object' === typeof opts[i] && opts.hasOwnProperty(i) || GitHubApi.prototype.hasOwnProperty(i)){
      bluebird.promisifyAll(opts[i]);
    }
  }
  return opts;
}

module.exports = create;