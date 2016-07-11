var test = require('tape');
var assertNoError = require('assert-no-error');
var getRandomItem = require('../get-random-item');

test('Random item test', function basicTest(t) {
  getRandomItem(checkItem);

  function checkItem(error, item) {
    assertNoError(t.ok, error, 'No error while getting random item.');
    t.ok(item.UUID, 'Item has a UUID.');
    t.ok(item.title, 'Item has a title.');
    t.ok(Array.isArray(item.captures), 'Item has a captures array.');
    t.ok(item.captures.length > 0, 'Captures array is not empty.');
    console.log(JSON.stringify(item, null, '  '));
    t.end();
  }
});
