const UserModel= require("../models/userModel")

const createUser = async function(req,res){
    let userData = req.body
    let savedUserData = await UserModel.create(userData)
    res.send(savedUserData)
}

module.exports.createUser =createUser;