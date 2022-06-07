const AuthorModel = require('../models/authorModel')

const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

module.exports.createAuthor= createAuthor
//module.exports.getUsersData= getUsersData