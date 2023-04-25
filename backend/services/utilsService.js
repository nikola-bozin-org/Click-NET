const { utils } = require("xlsx");
const { Utils } = require("../schemas");

const _getUtility = async () => {
  try {
    const utility = await Utils.findOne({});
    return { utility: utility};
  } catch (e) {
    return { error: e.message };
  }
};

const _setWorkstationLimit = async (newLimit) => {
  try {
    await Utils.findOneAndUpdate({}, { 'utility.workstationLimit': newLimit });
    return { message: "New Limit Set: " + newLimit };
  } catch (e) {
    return { error: e.message };
  }
};
const _setUtilityCenterName = async (newCenterName) => {
    try {
      await Utils.findOneAndUpdate({}, { 'utility.centerName': newCenterName });
      return { message: "New Center Name is: " + newCenterName};
    } catch (e) {
      return { error: e.message };
    }
  };

const _createUtility = async (limit, centerName) => {
  try {
    const utility = await Utils.findOne({});
    console.info(utility)
    if(utility) return {error:'Utility aleady exists.'}
    await Utils.create({
      utility: {
        workstationLimit: limit,
        centerName: centerName,
        numberOfWorkstations:0,
      },
    });
    return { message: "Utility created." };
  } catch (e) {
    return { error: e.message };
  }
};

const _numberOfWorkstations = async()=>{
  try{
    const utility = await Utils.findOne({});
    return {numberOfWorkstations:utility.utility.numberOfWorkstations};
  }catch(e){
    return {error:e.message}
  }
}
const _incrementNumberOfWorkstations = async()=>{
  try{
    const utility = await Utils.findOne({});
    utility.utility.numberOfWorkstations+=1;
    utility.save();    
  }catch(e){
    return {error:e.message}
  }
}

const _workstationLimit = async()=>{
  try{
    const utility = await Utils.findOne({});
    return {workstationLimit:utility.utility.workstationLimit}
  }catch(e){
    return {error:e.message}
  }
}




module.exports = {
  _getUtility,
  _setWorkstationLimit,
  _setUtilityCenterName,
  _createUtility,
  _numberOfWorkstations,
  _workstationLimit,
  _incrementNumberOfWorkstations
};
