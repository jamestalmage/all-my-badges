module.exports = html;

//<a href="https://coveralls.io/r/jamestalmage/tang?branch=master"><img src="https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master" alt="Coverage Status" /></a>

function html(data){
  return '<a href="' + data.linkUrl + '"><img src="' + data.imageUrl + '" alt="' + data.altText + '" /></a>'
}
