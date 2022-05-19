import CSV from '../index.js'
const txt = "1,2,3\n11,22,33\n111,222,333";
const r = CSV.parse(txt);
console.log(CSV.stringify(r));
