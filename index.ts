// index.js for csv-lite
import {CSVObject} from './lib/csv-object.js'
import {resetEnv, parse, stringify, options, replaceEolMark} from './lib/csv-lite.js'

export default {
    resetEnv,
    parse,
    stringify,
    options,
    CSVObject,
    replaceEolMark,
    CRLF: '\r\n',
    CR: '\r',
    LF: '\n',
}
