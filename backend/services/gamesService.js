const {Games} = require('../schemas')
const utilsService = require('./utilsService')

const _addGame = async(name,category,enabled,installationPath,zone)=>{
    try{
        const date = Date.now();
        await Games.create({name:name,category:category,lastModified:date,enabled:enabled,installationPath:installationPath,zone:zone})
        await utilsService._incrementGamesVersion();
        return {message:"New game added.",game:{name:name,category:category,lastModified:date,enabled:enabled,installationPath:installationPath,zone:zone}}
    }catch(e){
        return {error:e.message}
    }
}
 
const _allGames = async()=>{
    try{
        const allGames = await Games.find({},{__v:0}).lean();
        return {games:allGames}
    }catch(e){
        return {error:e.message}
    }
}

const _updateInstallatioPath = async(name)=>{

}

//update install path i updejt verziju

module.exports = {
    _addGame,
    _allGames,
}