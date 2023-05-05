const { Workstation} = require("../schemas");
const utilsService = require('../services/utilsService')
const { dataVersion } = require("../clientResources");
const {isValidIP,isValidMAC} = require('../helpers/validators')

const _addWorkstation = async(number,ip,mac,zone,x,y)=>{
    try{
        if(!isValidIP(ip)) return {error:`Invalid IP address.`};
        if(!isValidMAC(mac)) return {error:`Invalid MAC address.`}
        const numOfWorkStations =await utilsService._numberOfWorkstations();
        const workstationLimit = await utilsService._workstationLimit();
        if(numOfWorkStations.numberOfWorkstations===workstationLimit.workstationLimit)
        { return {error:'Workstation limit reached.'}}
        await Workstation.create({number:number,IP:ip,MAC:mac,zone:zone,gridPosition:{x:x,y:y}})
        await utilsService._incrementNumberOfWorkstations();
        return {message:"Workstation added.",workstation:{number:number,zone:zone}}
    }catch(e){
        if(e.code===11000) return {error:`Workstation with number ${number} is already registered.`}
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
    const workstations = await Workstation.find({},{__v:0});
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