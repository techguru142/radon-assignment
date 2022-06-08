
const bookModel = require("../models/bookModel")
const AuthorModel = require("../models/authorModel")



const createBook= async function (req, res) {
    let data= req.body

    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const allBook = async function(req,res){
    let savedData = await bookModel.find()
    res.send(savedData)
}
//find th ebook written by Chetan Bhagat
const getBooksData= async function (req, res) {
    let authorData = await AuthorModel.find({author_Name:"Chetan Bhagat"}).select({_id : 1})
    console.log(authorData)
    let bookData = await bookModel.find({authorData})
    res.send(bookData)
}

const findTwoStates = async function (req, res){
    let bookData = await bookModel.findOneAndUpdate({bookName:"Two states"},{$set:{price:100}},{new:true}).select({author_id:1})
    console.log(bookData)
    let book = await AuthorModel.find({bookData}).select({author_Name :1})
   //console.log(book)
    let price = bookData.price
    res.send({msg:book,price})
}

const findBook = async function(req, res){
    let bookData = await bookModel.find({price:{$gte:50, $lte:100}}).select({_id:1})
    let allBook = await AuthorModel.find({bookData}).select({author_Name:1})
   
    res.send(allBook)
    
    
}
  


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.findTwoStates = findTwoStates
module.exports.findBook = findBook
module.exports.allBook = allBook