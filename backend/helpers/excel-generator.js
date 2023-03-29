const XLSX = require('xlsx');


const testData = [
    { Name: 'John', Age: 30,Address:"Nigger" },
    { Name: 'Jane', Age: 25,Address:"Bigger" },
    { Name: 'Bob', Age: 40 ,Address:"Gigger" }
]

const generate = (jsonData)=>{
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const desktopPath = require('os').homedir();
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US').replace(/\//g, '-');
    const filePath = require('path').join(desktopPath, `${dateString}.xlsx`);
    XLSX.writeFile(workbook, filePath);
}


module.exports = generate;