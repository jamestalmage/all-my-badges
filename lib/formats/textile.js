module.exports = textile;

//!https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master(Coverage Status)!:https://coveralls.io/r/jamestalmage/tang?branch=master
function textile (data) {
  return '!' + data.imageUrl + '(' + data.altText + ')!:' + data.linkUrl;
}