module.exports = function(Badge) {
  var providers = {
    'travis'             : require('./travis'),
    'code-climate'       : require('./code-climate'),
    'coveralls'          : require('./coveralls'),
    'david-dm'           : require('./david-dm')
  };

  for (var i in providers) {
    if (providers.hasOwnProperty(i)) {
      Badge.addProvider(i, providers[i]);
    }
  }
};