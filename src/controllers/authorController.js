const AuthorModel = require('../models/authorModel')

const createAuthor = async function(req, res){
    let authorData = req.body
    let savedData = await AuthorModel.create(authorData)
    res.send({msg:savedData})
}


module.exports.createAuthor = createAuthor