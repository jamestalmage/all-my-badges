var Badge = require('./badge')();

Badge.use(require('../providers'));
Badge.use(require('../formats'));

module.exports = Badge;