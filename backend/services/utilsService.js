const { Utils } = require("../schemas");

const _getUtility = async () => {
  try {
    const utility = await Utils.find({});
    return { utility: utility};
  } catch (e) {
    return { error: e.message };
  }
};

const _setUtilityPCLimit = async (newLimit) => {
  try {
    await Utils.findOneAndUpdate({}, { 'utility.pcLimit': newLimit });
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
    const utility = await Utils.find({});
    if(utility) return {error:'Utility aleady exists.'}
    await Utils.create({
      utility: {
        pcLimit: limit,
        centerName: centerName,
      },
    });
    return { message: "Utility created." };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  _getUtility,
  _setUtilityPCLimit,
  _setUtilityCenterName,
  _createUtility,
};
