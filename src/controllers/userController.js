const UserModel= require("../models/userModel")

const createUser = async function(req,res){
    let userDetails = req.body
    userDetails.isFreeAppUser = req.appTypeFree
    let savedUserData = await UserModel.create(userDetails)
    res.send(savedUserData)
}

module.exports.createUser =createUser;