const { Workstation} = require("../schemas");
const utilsService = require('../services/utilsService')
const { dataVersion } = require("../clientResources");

const _addWorkstation = async(number,ip,mac,zone,x,y)=>{
    try{
        const numOfWorkStations =await utilsService._numberOfWorkstations();
        const workstationLimit = await utilsService._workstationLimit();
        if(numOfWorkStations.numberOfWorkstations===workstationLimit.workstationLimit)
        { return {error:'Workstation limit reached.'}}
        await utilsService._incrementNumberOfWorkstations();
        await Workstation.create({number:number,IP:ip,MAC:mac,zone:zone,gridPosition:{x:x,y:y}})
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

const _getWorkStations = async()=>{
  try{
    const workstations = await Workstation.find({},{IP:0,MAC:0,__v:0});
    return {workstations:workstations}
  }catch(e){
    return {error:e.message}
  }
}


module.exports={
    _addWorkstation,
    _wakeUp,
    _getWorkStations
}