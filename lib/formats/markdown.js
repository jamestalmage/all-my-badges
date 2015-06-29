module.exports = markdown;

function markdown(data) {
  return '[![' + data.altText + '](' + data.imageUrl + ')](' + data.linkUrl + ')';
}