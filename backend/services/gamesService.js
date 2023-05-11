const { zones } = require('../helpers/enums');
const {Games, Image} = require('../schemas')
const utilsService = require('./utilsService')
const fs = require('fs');
const path = require('path');

const _addGame = async(name,category,enabled,installationPath,zone,image)=>{
    try{
        const fullPath = path.join(__dirname, '..', 'uploads', image.filename); 
        const date = Date.now();
        const newImage = Image({
            name:image.originalname,
            image: {
                data: fs.readFileSync(fullPath),
                contentType: image.mimetype
            }
        })
        await newImage.save();
        const finalZones = [];
        if(zone==='Both') finalZones.push(zones.Lobby,zones.Pro);
        const gameCreated = await Games.create({name:name,category:category,lastModified:date,enabled:enabled,installationPath:installationPath,zone:finalZones.length===0?zone:finalZones,image:newImage._id})
        await utilsService._incrementGamesVersion();
        fs.unlinkSync(fullPath);
        return {message:"New game added.",game:{name:name,category:category,lastModified:date,enabled:enabled,installationPath:installationPath,zone:zone,image: newImage._id,_id:gameCreated._id}}
    }catch(e){
        return {error:e.message}
    }
}
 
const _allGames = async(amountToReturn,page)=>{
    try{
        const limit = parseInt(amountToReturn, 10);
        const skip = (parseInt(page, 10)) * limit;
        const allGames = await Games.find({},{__v:0}).lean().limit(limit).skip(skip);
        return {games:allGames}
}catch(e){
        return {error:e.message}
    }
}
const _gameImage = async(id)=>{
    try{
        const image = await Image.findById(id);
        return {image:image}
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
    _gameImage,
}