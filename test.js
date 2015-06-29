
var gh = require('./lib/github');

gh.getNameOfAllReposWithPackage('jamestalmage').then(console.log);