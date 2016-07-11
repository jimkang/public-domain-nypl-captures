var lineChomper = require('line-chomper');
var jsonfile = require('jsonfile');
var probable = require('probable');

var numberOfLines = 190494;

var lineOffsets = jsonfile.readFileSync(
  __dirname + '/data/pd_items.ndjson.offsets'
);

function getRandomItem(done) {
  var index = probable.rollDie(numberOfLines);

  lineChomper.chomp(
    __dirname + '/data/pd_items.ndjson',
    {
      lineOffsets: lineOffsets,
      fromLine: index,
      lineCount: 1
    },
    readDone
  );

  function readDone(error, lines) {
    if (error) {
      done(error);
    }
    else if (!lines || !Array.isArray(lines) || lines.length < 1) {
      done(new Error('Could not get valid line for offset ' + index));
    }
    else {
      done(error, JSON.parse(lines[0]));
    }
  }
}

module.exports = getRandomItem;
