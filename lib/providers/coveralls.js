module.exports = coveralls;

function coveralls(opts) {
  var user = opts.gh.org || opts.gh.user;
  var repo = opts.gh.repo;
  var imgUrl = 'https://coveralls.io/repos/' + user + '/' + repo + '/badge.svg';
  var linkUrl = 'https://coveralls.io/r/' + user + '/' + repo;

  if (opts.gh.default_branch) {
    imgUrl += '?branch=' + opts.gh.default_branch;
    linkUrl += '?branch=' + opts.gh.default_branch;
  }

  return {
    altText: 'Coverage Status',
    linkUrl: linkUrl,
    imageUrl: imgUrl
  };
}

