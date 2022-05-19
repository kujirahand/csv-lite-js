// test format
import CSV from '../index.js'
import assert from 'assert'

var CSVObject = CSV.CSVObject;

describe('format::stringify', function () {
  it('eol', function () {
    var csv = new CSVObject();
    csv.options.eol = "\n";
    csv.setArray([
      ["name", "age"],
      ["Aki", 30],
    ]);
    assert.equal(csv.toString(), "name,age\nAki,30\n");
  });
});

