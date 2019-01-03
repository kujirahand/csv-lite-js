// csv-lite.js --- for Browser
'use strict';
var options = {
  delimiter: ',',
  eol: "\r\n"
};

function parse(txt, delimiter) {
  // delimiter
  if (delimiter == undefined) {
    delimiter = options.delimiter;
  }
  // check txt
  txt = "" + txt + "\n";
  txt = txt.split("\r\n").join("\n"); // CRLF to LF
  txt = txt.split("\r").join("\n");   // CR   to LF
  txt = txt.replace(/\s+$/, '')+"\n";
  // set pattern
  var pat = "^(.*?)([\\"+delimiter+"\\n])";
  var re = new RegExp(pat);
  // cells.push(txt)
  var convType = function (v) {
    if (typeof(v) == 'string') {
      if (v.search(/^[0-9\.]+$/) >= 0) {
        v = parseFloat(v); // convert number
      }
    }
    return v;
  };
  // parse txt
  var res = [], cells = [];
  while (txt != "") {
    // trim top
    txt = txt.replace(/^\s+/, "");
    var c = txt.charAt(0);
    // number or simple string
    if (c !== '"') { // number or simple str
      var m = re.exec(txt);
      if (!m) {
        cells.push(convType(txt));
        res.push(cells);
        cells = [];
        break;
      }
      // console.log(pat,m);
      if (m[2] == "\n") {
        cells.push(convType(m[1]));
        res.push(cells);
        cells = [];
      } else if (m[2] == delimiter) {
        cells.push(convType(m[1]));
      }
      txt = txt.substr(m[0].length);
      continue;
    }
    if (c == delimiter) {
      cells.push('');
      continue;
    }
    // "" ... blank data
    if (txt.substr(0, 2) == '""') {
      cells.push('');
      txt = txt.substr(2);
      continue;
    }
    // "..."
    var i = 1, s = "";
    while (i < txt.length) {
      var c1 = txt.charAt(i);
      var c2 = txt.charAt(i + 1);
      // console.log("@" + c1 + c2);
      // 2quote => 1quote char
      if (c1 == '"' && c2 == '"') {
        i += 2;
        s += '"';
        continue;
      }
      if (c1 == '"') {
        i++;
        if (c2 == delimiter) {
          i++;
          cells.push(convType(s));
          s = '';
          break;
        }
        if (c2 == "\n") {
          i++;
          cells.push(convType(s));
          res.push(cells);
          cells = [];
          break;
        }
        // if (c2 == " " || c2 == "\t") {
        i++;
        continue;
      }
      s += c1;
      i++;
    }
    txt = txt.substr(i);
  }
  if (cells.length > 0) res.push(cells);
  return res;
}

function stringify(ary, delimiter, eol) {
  // check arguments
  if (delimiter == undefined) {
    delimiter = options.delimiter;
  }
  if (eol == undefined) {
    eol = options.eol;
  }
  var valueConv = genValueConverter(delimiter);
  if (ary == undefined) return "";
  var r = "";
  for (var i = 0; i < ary.length; i++) {
    var cells = ary[i];
    if (cells == undefined) {
      r += eol; continue;
    }
    for (var j = 0; j < cells.length; j++) {
      cells[j] = valueConv(cells[j]);
    }
    r += cells.join(delimiter) + eol;
  }
  return r;
}

function genValueConverter(delimiter) {
  return (function(s) {
    s = "" + s;
    var f_quot = false;
    if (s.indexOf("\n") >= 0) f_quot = true;
    if (s.indexOf(delimiter) >= 0) f_quot = true;
    if (s.indexOf('"') >= 0) {
      f_quot = true;
      s = s.replace(/\"/g, '""');
    }
    if (f_quot) s = '"' + s + '"';
    return s;
  });
}

// exports
module.exports = {
  "options"       : options,
  "parse"         : parse,
  "stringify"     : stringify
};

