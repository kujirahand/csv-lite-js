// csv-object.js --- for Browser
import { options as defOptions, parse, stringify } from './csv-lite.js';
// constructor
export class CSVObject {
    constructor(options = undefined) {
        this.rows = [];
        this.options = options || defOptions;
        this.useHeader = false;
    }
    toString() {
        var delimiter = this.options.delimiter;
        var eol = this.options.eol;
        return stringify(this.rows, delimiter, eol);
    }
    parse(str, delimiter = undefined) {
        this.rows = parse(str, delimiter);
    }
    fromString(str, delimiter = undefined) {
        this.parse(str, delimiter);
    }
    stringify() {
        return this.toString();
    }
    getCell(row, col) {
        return this.rows[row][col];
    }
    setCell(row, col, value) {
        // check col and row length
        var colsize = this.getColSize();
        while (this.rows.length <= row) {
            var cols = [];
            for (var i = 0; i < colsize; i++) {
                cols.push('');
            }
            this.rows.push(cols);
        }
        // set value
        this.rows[row][col] = value;
    }
    getColSize() {
        if (this.rows.length == 0) {
            return 0;
        }
        return this.rows[0].length;
    }
    setArray(a) {
        this.rows = a;
    }
    getArray() {
        return this.rows;
    }
    getRowValues(rowNo) {
        if (rowNo >= this.rows.length)
            return [];
        return this.rows[rowNo];
    }
    getColValues(colNo) {
        var res = [];
        for (var i in this.rows) {
            var row = this.rows[i];
            res.push(row[colNo]);
        }
        return res;
    }
    find(colNo, keyword, offset) {
        if (offset == undefined) {
            offset = this.useHeader ? 1 : 0;
        }
        for (var i = offset; i < this.rows.length; i++) {
            var row = this.rows[i];
            if (row[colNo] == keyword)
                return i;
        }
        return -1;
    }
    findAll(colNo, keyword, offset, limit = undefined) {
        const result = [];
        if (offset == undefined)
            offset = (this.useHeader) ? 1 : 0;
        if (limit == undefined)
            limit = this.rows.length;
        for (var i = offset; i < this.rows.length; i++) {
            var row = this.rows[i];
            if (row[colNo] == keyword) {
                result.push(row);
                if (limit <= result.length)
                    break;
            }
        }
        return result;
    }
    // callback = function(value, rowIndex, rowArray) { return true; };
    filter(colNo, callback) {
        return this.rows.filter(function (row, rowNo, array) {
            if (row == undefined)
                return false;
            var value = row[colNo];
            return callback(value, rowNo, array);
        });
    }
    sort(colNo, isAsc) {
        var sort_func;
        if (isAsc == undefined)
            isAsc = true;
        if (isAsc) {
            sort_func = function (a, b) { return (a[colNo] > b[colNo]) ? 1 : -1; };
        }
        else {
            sort_func = function (a, b) { return (a[colNo] < b[colNo]) ? 1 : -1; };
        }
        if (this.useHeader) {
            const header = this.rows.shift();
            this.rows.sort(sort_func);
            if (header) {
                this.rows.unshift(header);
            }
        }
        else {
            this.rows.sort(sort_func);
        }
    }
    sortNumber(colNo, isAsc) {
        var sort_func;
        if (isAsc == undefined)
            isAsc = true;
        if (isAsc) {
            sort_func = function (a, b) {
                return parseFloat(a[colNo]) - parseFloat(b[colNo]);
            };
        }
        else {
            sort_func = function (a, b) {
                return parseFloat(b[colNo]) - parseFloat(a[colNo]);
            };
        }
        if (this.useHeader) {
            var header = this.rows.shift();
            this.rows.sort(sort_func);
            if (header) {
                this.rows.unshift(header);
            }
        }
        else {
            this.rows.sort(sort_func);
        }
    }
    // insert / delete
    insertRow(rowNo, rowArray) {
        return this.rows.splice(rowNo, 0, rowArray);
    }
    insert(rowNo, rowArray) {
        return this.insertRow(rowNo, rowArray);
    }
    add(rowArray) {
        this.rows.push(rowArray);
    }
    deleteRow(rowNo) {
        return this.rows.splice(rowNo, 1);
    }
    ;
    insertCol(colNo, values) {
        this.rows.map(function (row, index, _array) {
            row.splice(colNo, 0, values[index]);
            return row;
        });
    }
    ;
    deleteCol(colNo) {
        this.rows.map(function (row, index, array) {
            row.splice(colNo, 1);
            return row;
        });
    }
    ;
    get length() {
        return this.rows.length;
    }
}
