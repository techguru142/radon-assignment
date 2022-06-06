
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const bookList = async function(req, res){
    let bookData= await bookModel.find().select({bookName:1, authorName:1})
    res.send(bookData)
}

const getXINRBook = async function(req,res){
    let INRBook = await bookModel.find({$or:[{price:100},{price:200},{price:100}]})
    res.send(INRBook)
}
module.exports.createBook= createBook
module.exports.bookList=bookList
module.exports.getXINRBook=getXINRBook
