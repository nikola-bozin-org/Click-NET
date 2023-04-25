const { Workstation} = require("../schemas");
const utilsService = require('../services/utilsService')
const { dataVersion } = require("../clientResources");

const _addWorkstation = async(number,ip,mac,zone)=>{
    try{
        const numOfWorkStations =await utilsService._numberOfWorkstations();
        const workstationLimit = await utilsService._workstationLimit();
        if(numOfWorkStations.numberOfWorkstations===workstationLimit.workstationLimit)
        { return {error:'Workstation limit reached.'}}
        await utilsService._incrementNumberOfWorkstations();
        await Workstation.create({nubmer:number,IP:ip,MAC:mac,zone:zone})
        return {message:"Workstation added.",workstation:{number:number,zone:zone}}
    }catch(e){
        return {error:e.message};
    }
}

const _wakeUp = async(pcNumber)=>{
    try{
      return {data:{pcNumber:pcNumber,online:true,dataVersion:dataVersion}}
    }catch(e){
      return {error:e.message}
    }
  }


module.exports={
    _addWorkstation,
    _wakeUp,
}