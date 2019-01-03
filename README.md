# csv-lite-js

CSV Library for Browser

## Install

```
$ npm install csv-lite-js
```

## Usage

Simple static method:

```javascript
var CSV = require('csv-lite-js');

// parse CSV string
var txt = "1,2,3\n11,22,33\n111,222,333";
var a = CSV.parse(txt);
console.log(a[0][0]); // 1
console.log(a[1][1]); // 22
```

## Parse and Stringify

method:

- CSV.parse()
- CSV.stringify()

## Parse CSV from text

```javascript
var csv = "a,b,c\nd,e,f";
var a = CSV.parse(csv);
console.log(a[0][0]); // a
console.log(a[0][1]): // b
console.log(a[1][0]); // d
console.log(a[1][1]): // e
```

## Stringify Array to CSV

```javascript
var a = [[1,2,3],[4,5,6]]
var c = CSV.stringify(a);
console.log(c); // 1,2,3\n4,5,6
```

## TSV (Tab separated value)

```javascript
// set tsv option
CSV.options.delimiter = "\t";
// load
var a = CSV.readFileSync(fname);
```

