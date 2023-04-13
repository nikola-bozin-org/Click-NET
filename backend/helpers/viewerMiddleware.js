const jwt = require('../jwt')
const {usersRoles, userRoles} = require('../helpers/enums');
const statusCode = require('../statusCodes');


const checkIfViewer = async(req,res,next) =>{
    if(req.body.username && req.body.username ==='viewer'){
        if(req.method === 'GET')
        return next();
        return;
    }
    next();
}

module.exports=checkIfViewer;