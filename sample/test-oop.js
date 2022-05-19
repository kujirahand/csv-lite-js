import CSV from '../index.js'

var csv = new CSV.CSVObject()
csv.parse("name,age\r\nAki,14\r\nHuyu,20")
console.log(csv.getCell(1,0)) // Aki
console.log(csv.getCell(2,0)) // Huyu
console.log(csv.toString())
