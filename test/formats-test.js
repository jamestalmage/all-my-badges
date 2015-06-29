describe('formats', function() {
  var expect = require('chai').expect;

  describe('markdown', function() {
    var markdown = require('../lib/formats/markdown');

    it('creates a markdown link', function() {
      var data = {
        altText: 'Build Status',
        imageUrl: 'https://travis-ci.org/jamestalmage/tang.svg?branch=master',
        linkUrl: 'https://travis-ci.org/jamestalmage/tang'
      };
      var expected = '[![Build Status](https://travis-ci.org/jamestalmage/tang.svg?branch=master)](https://travis-ci.org/jamestalmage/tang)';

      expect(markdown(data)).to.equal(expected);
    });
  });

  describe('textile', function() {
    var textile = require('../lib/formats/textile');

    it('creates a textile link', function() {
      var data = {
        altText: 'Coverage Status',
        imageUrl: 'https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master',
        linkUrl: 'https://coveralls.io/r/jamestalmage/tang?branch=master'
      };

      var expected = '!https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master(Coverage Status)!:https://coveralls.io/r/jamestalmage/tang?branch=master';

      expect(textile(data)).to.equal(expected);
    });
  });

  describe('html', function() {
    var html = require('../lib/formats/html');

    it('creates a html link', function() {
      var data = {
        altText: 'Coverage Status',
        imageUrl: 'https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master',
        linkUrl: 'https://coveralls.io/r/jamestalmage/tang?branch=master'
      };

      var expected = '<a href="https://coveralls.io/r/jamestalmage/tang?branch=master"><img src="https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master" alt="Coverage Status" /></a>';

      expect(html(data)).to.equal(expected);
    });
  });

});