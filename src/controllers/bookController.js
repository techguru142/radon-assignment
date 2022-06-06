
const bookModel = require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const bookList = async function(req, res){
    let bookData= await bookModel.find().select({bookName:1, authorName:1})
    res.send(bookData)
}

const getBooksInYear = async function(req,res){
    let year = req.query
    let bookDetails = await bookModel.find(year)
    res.send(bookDetails)
}

const getXINRBook = async function(req,res){
    let INRBook = await bookModel.find({"price.indian":{$in:["INR 100","INR 200","INR 500"]}})
    res.send(INRBook)
}
const getParticularBooks = async function(req, res){
    let bookDetails = await bookModel.find({authorName:"Chetan Bhagat"})
   if (bookDetails){
   res.send({msg:bookDetails})
   }else res.send("No books found")
}

const getRandomBooks = async function(req,res){
    let randomBooks = await bookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send(randomBooks)
}


module.exports.createBook= createBook
module.exports.bookList=bookList
module.exports.getXINRBook=getXINRBook
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getRandomBooks=getRandomBooks
