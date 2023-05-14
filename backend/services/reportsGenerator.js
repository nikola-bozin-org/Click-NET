const cashRegisterService = require('../services/cashRegisterService')
const generate = require('../helpers/excel-generator')
const { Payments } = require('../schemas');

const _generateZReport = async(startDate,endDate)=>{
    try{
        const _startDate = new Date(startDate);
        const _endDate = new Date(endDate);
        const payments = await Payments.find({  paymentDate: {
            $gte: _startDate,
            $lte: _endDate
          }})
        const filePath = generate(payments);
        return {filePath:filePath}
    }catch(e){
        return {error:e.message}
    }
}



module.exports={
    _generateZReport
}