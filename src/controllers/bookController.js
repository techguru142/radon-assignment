const BookModel = require('../models/bookModel')

const createBook = async function(req,res){
    let data = req.body
    let savedData = await BookModel.create(data)
    res.send({msg: savedData})
}

const getBook= async function(req,res){
   let bookData = await BookModel.find()
    res.send({msg:bookData})
}

module.exports.createBook = createBook
module.exports.getBook = getBook