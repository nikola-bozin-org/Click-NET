const XLSX = require('xlsx');


const generate = (jsonData)=>{
    const data = convertToExcelData(jsonData);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const desktopPath = require('os').homedir();
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US').replace(/\//g, '-');
    const filePath = require('path').join(desktopPath, `${dateString}.xlsx`);
    XLSX.writeFile(workbook, filePath);
    return filePath;
}
const convertToExcelData = (data) => {
    return data.map(item => {
        return {
            Username: item.username,
            PaymentAmount: item.paymentAmount.toString(),
            PaymentDate: formatDate(item.paymentDate),
            Receipt: item.receipt
        };
    });
};

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${month}/${day}/${year} ${hours}:${minutes}`;
}


module.exports = generate;