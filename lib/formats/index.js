module.exports = function(Badge) {
  var formats = {
    'markdown' : require('./markdown')
  };

  for (var i in formats) {
    if (formats.hasOwnProperty(i)) {
      Badge.addFormat(i, formats[i]);
    }
  }
};