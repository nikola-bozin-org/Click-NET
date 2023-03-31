const cashRegisterService = require('../services/cashRegisterService')
const generate = require('../helpers/excel-generator')

const _generateZReport = async()=>{
    try{
        const payments = await cashRegisterService._getCurrentSessionPayments();
        generate(payments.currentSessionPayments)
        return {report:"Generated"}
    }catch(e){
        return {error:e.message}
    }
}



module.exports={
    _generateZReport
}