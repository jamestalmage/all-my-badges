module.exports = davidDm;

function davidDm(data, type) {
  var user = data.gh.org || data.gh.user;
  var repo = data.gh.repo;

  var base = 'https://david-dm.org/' + user + '/' + repo;

  if (type) {
    type = type.toLowerCase();

    if (type === 'dev' || type === 'peer' || type === 'optional'){
      return {
        altText: type + 'Dependency Status',
        imageUrl: base + '/' + type + '-status.svg',
        linkUrl: base + '#info=' + type + 'Dependencies'
      };
    }

    throw new Error('david-dm: bad type(' + type + ') must be [null|dev|peer|optional]');
  }

  return {
    altText: 'Dependency Status',
    imageUrl: base + '.svg',
    linkUrl: base
  };
}