module.exports = nodeico;

var ALLOWED_TYPES = ['standard', 'compact', 'mini', 'histogram'];

var BADGE_BASE = 'https://nodei.co/npm/';
var HISTOGRAM_BASE = 'https://nodei.co/npm-dl/';

var BADGE_OPTIONS = ['downloads', 'downloadRank', 'stars'];
var HISTOGRAM_OPTIONS = ['months', 'height'];

function nodeico (data, opts) {
  opts = opts || {};
  var name = data.pkg.name;
  var type = (opts.type || 'standard').toLowerCase();

  if (ALLOWED_TYPES.indexOf(type) === -1) {
    throw new Error('nodeico: bad type. allowed values are [' + ALLOWED_TYPES.join('|') + ']');
  }

  var imageUrl = (type === 'histogram' ? HISTOGRAM_BASE : BADGE_BASE) + name + '.png';

  var imageParams = [];
  if (type === 'standard') {
    BADGE_OPTIONS.forEach(function (name) {
      if (opts[name]) {
        imageParams.push(name + '=true');
      }
    });
  } else if (type === 'histogram') {
    HISTOGRAM_OPTIONS.forEach(function(name) {
      if (opts[name]) {
        imageParams.push(name + '=' + opts[name]);
      }
    });
  } else {
    imageParams.push(type + '=true');
  }

  if (imageParams.length) {
    imageUrl += '?' + imageParams.join('&');
  }

  return {
    altText:'NPM',
    imageUrl: imageUrl,
    linkUrl: BADGE_BASE + name + '/'
  };
}
