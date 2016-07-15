var test = require('tape');
var assertNoError = require('assert-no-error');
var getRandomCapture = require('../get-random-capture');

test('Random capture test', function basicTest(t) {
  getRandomCapture({filterOutBrokenImageLinks: true}, checkCapture);

  function checkCapture(error, capture) {
    assertNoError(t.ok, error, 'No error while getting random capture');
    t.ok(capture.sourceUUID, 'Capture has a sourceUUID.');
    t.ok(capture.title, 'Capture has a title.');
    t.ok(capture.imageURL, 'Capture has an imageURL.');
    t.ok(capture.digitalCollectionsURL, 'Capture has an digitalCollectionsURL.');
    console.log(JSON.stringify(capture, null, '  '));
    t.end();
  }
});
