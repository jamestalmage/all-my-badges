module.exports = codeClimate;

function codeClimate(data, type) {
  var user = data.gh.org || data.gh.user;
  var repo = data.gh.repo;

  if (type) {
    type = type.toLowerCase();
  }

  var base = 'https://codeclimate.com/github/' + user + '/' + repo;

  if (!type || type === 'gpa') {
    return {
      altText: 'Code Climate',
      imageUrl: base + '/badges/gpa.svg',
      linkUrl: base
    };
  }

  if (type === 'coverage') {
    return {
      altText: 'Test Coverage',
      imageUrl: base + '/badges/coverage.svg',
      linkUrl: base + '/coverage'
    };
  }

  throw new Error('code-climate: bad type (' + type + ') must be [null|gpa|coverage]');
}