var hyperid = require('../');
var test = require('tape');
var BloomFilter = require('bloomfilter').BloomFilter;
var maxInt = Math.pow(2, 31) - 1

test('uniqueness', function (t) {

  t.plan(3);

  var instance = hyperid()
  var bloom = new BloomFilter(
    32 * 4096 * 4096, // number of bits to allocate.
    16                // number of hash functions.
  );

  var conflicts = 0;
  var ids = 0;

  var max = maxInt * 2;

  for (var i = 0; i < max; i += Math.ceil(Math.random() * 4096)) {
    var id = instance()

    if (bloom.test(id)) {
      conflicts++
    }

    ids++;

    bloom.add(id);
  }

  t.pass(ids + ' id generated');
  t.pass(conflicts + ' bloom filter conflicts');
  t.ok(conflicts / ids < 0.001, '0,1% conflict ratio using bloom filters');
});

test('url safe uniqueness', function (t) {

  t.plan(3);

  var instance = hyperid({ urlSafe: true });

  var bloom = new BloomFilter(
    32 * 4096 * 4096, // number of bits to allocate.
    16                // number of hash functions.
  );

  var conflicts = 0;
  var ids = 0;

  var max = maxInt * 2;

  for (var i = 0; i < max; i += Math.ceil(Math.random() * 4096)) {

    var id = instance();

    if (bloom.test(id)) {
      conflicts++
    }

    ids++;

    bloom.add(id)
  }

  t.pass(ids + ' id generated');
  t.pass(conflicts + ' bloom filter conflicts');
  t.ok(conflicts / ids < 0.001, '0,1% conflict ratio using bloom filters');

});