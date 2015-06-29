describe('providers', function() {

  var expect = require('chai').expect;

  describe('travis', function() {
    var travis = require('../lib/providers/travis');

    it('creates link data', function() {
      var actual = travis({
        gh:{
          org: 'john',
          repo: 'smith'
        }
      });

      var expected = {
        altText: 'Build Status',
        imageUrl: 'https://travis-ci.org/john/smith.svg',
        linkUrl: 'https://travis-ci.org/john/smith'
      };

      expect(actual).to.eql(expected);
    });

    it('adds default branch if present', function() {
      var actual = travis({
        gh:{
          user: 'jamestalmage',
          repo: 'tang',
          default_branch: 'master'
        }
      });

      var expected = {
        altText: 'Build Status',
        imageUrl: 'https://travis-ci.org/jamestalmage/tang.svg?branch=master',
        linkUrl: 'https://travis-ci.org/jamestalmage/tang'
      };

      expect(actual).to.eql(expected);
    });
  });

  describe('coveralls', function() {
    var coveralls = require('../lib/providers/coveralls');

    it('creates link data', function() {
      var actual = coveralls({
        gh:{
          org: 'john',
          repo: 'smith'
        }
      });

      var expected = {
        altText: 'Coverage Status',
        imageUrl: 'https://coveralls.io/repos/john/smith/badge.svg',
        linkUrl: 'https://coveralls.io/r/john/smith'
      };

      expect(actual).to.eql(expected);
    });

    it('adds default branch if present', function() {
      var actual = coveralls({
        gh:{
          user: 'jamestalmage',
          repo: 'tang',
          default_branch: 'master'
        }
      });

      var expected = {
        altText: 'Coverage Status',
        imageUrl: 'https://coveralls.io/repos/jamestalmage/tang/badge.svg?branch=master',
        linkUrl: 'https://coveralls.io/r/jamestalmage/tang?branch=master'
      };

      expect(actual).to.eql(expected);
    });
  });

  describe('david-dm', function() {
    var davidDm = require('../lib/providers/david-dm');

    it('optional dependencies', function() {
      var actual = davidDm({
        gh:{
          org: 'john',
          repo: 'smith'
        }
      }, 'optional');

      var expected = {
        altText: 'optionalDependency Status',
        imageUrl: 'https://david-dm.org/john/smith/optional-status.svg',
        linkUrl: 'https://david-dm.org/john/smith#info=optionalDependencies'
      };

      expect(actual).to.eql(expected);
    });

    it('dev dependencies', function() {
      var actual = davidDm({
        gh:{
          user: 'jamestalmage',
          repo: 'tang'
        }
      }, 'dev');

      var expected = {
        altText: 'devDependency Status',
        imageUrl: 'https://david-dm.org/jamestalmage/tang/dev-status.svg',
        linkUrl: 'https://david-dm.org/jamestalmage/tang#info=devDependencies'
      };

      expect(actual).to.eql(expected);
    });

    it('peer dependencies', function() {
      var actual = davidDm({
        gh:{
          user: 'jamestalmage',
          repo: 'tang'
        }
      }, 'peer');

      var expected = {
        altText: 'peerDependency Status',
        imageUrl: 'https://david-dm.org/jamestalmage/tang/peer-status.svg',
        linkUrl: 'https://david-dm.org/jamestalmage/tang#info=peerDependencies'
      };

      expect(actual).to.eql(expected);
    });

    it('dependencies', function() {
      var actual = davidDm({
        gh:{
          user: 'jamestalmage',
          repo: 'tang'
        }
      });

      var expected = {
        altText: 'Dependency Status',
        imageUrl: 'https://david-dm.org/jamestalmage/tang.svg',
        linkUrl: 'https://david-dm.org/jamestalmage/tang'
      };

      expect(actual).to.eql(expected);
    });

    it('throws for a bad type value', function() {
      expect(function(){
        davidDm({
          gh:{
            user: 'jamestalmage',
            repo: 'tang'
          }
        }, 'badtype');
      }).to.throw();
    });
  });

  describe('code-climate', function() {
    var codeClimate = require('../lib/providers/code-climate');

    it('gpa', function() {
      var input = {
        gh: {
          org: 'john',
          repo: 'smith'
        }
      };

      var expected = {
        altText: 'Code Climate',
        imageUrl: 'https://codeclimate.com/github/john/smith/badges/gpa.svg',
        linkUrl: 'https://codeclimate.com/github/john/smith'
      };

      expect(codeClimate(input), 'null input').to.eql(expected);
      expect(codeClimate(input, 'gpa')).to.eql(expected);
    });

    it('coverage', function() {
      var actual = codeClimate({
        gh:{
          user: 'jamestalmage',
          repo: 'tang'
        }
      }, 'coverage');

      var expected = {
        altText: 'Test Coverage',
        imageUrl: 'https://codeclimate.com/github/jamestalmage/tang/badges/coverage.svg',
        linkUrl: 'https://codeclimate.com/github/jamestalmage/tang/coverage'
      };

      expect(actual).to.eql(expected);
    });

    it('throws for a bad type value', function() {
      expect(function(){
        codeClimate({
          gh:{
            user: 'jamestalmage',
            repo: 'tang'
          }
        }, 'badtype');
      }).to.throw();
    });
  });

  describe('nodei.co ', function() {
    var nodeico = require('../lib/providers/nodeico');

    var data = {
      pkg: {
        name: 'tang'
      }
    };

    function test(name, opts, imageUrl) {
      it(name, function() {
        expect(nodeico(data,opts)).to.eql({
          altText: 'NPM',
          imageUrl: imageUrl,
          linkUrl: 'https://nodei.co/npm/tang/'
        })
      });
    }

    test('standard', null, 'https://nodei.co/npm/tang.png');
    test('compact', {type:'compact'}, 'https://nodei.co/npm/tang.png?compact=true');
    test('mini', {type:'mini'}, 'https://nodei.co/npm/tang.png?mini=true');
    test('downloads', {downloads:true}, 'https://nodei.co/npm/tang.png?downloads=true');
    test('downloadRank', {downloadRank:true}, 'https://nodei.co/npm/tang.png?downloadRank=true');
    test('stars', {stars:true}, 'https://nodei.co/npm/tang.png?stars=true');
    test('downloads&stars', {downloads:true, stars:true}, 'https://nodei.co/npm/tang.png?downloads=true&stars=true');

    describe('histogram ', function() {
      test('default', {type:'histogram'}, 'https://nodei.co/npm-dl/tang.png');
      test('9 months', {type:'histogram', months:9}, 'https://nodei.co/npm-dl/tang.png?months=9');
      test('height 2', {type:'histogram', height:2}, 'https://nodei.co/npm-dl/tang.png?height=2');
      test('height 3, 6 months', {type:'histogram', height:3, months:6}, 'https://nodei.co/npm-dl/tang.png?months=6&height=3');
    });

    it('throws error with bad type', function() {
      expect(function() {
        nodeico(data, {type:'badtype'});
      }).to.throw();
    });
  });
});