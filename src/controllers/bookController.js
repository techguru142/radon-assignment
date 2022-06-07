
const bookModel = require("../models/bookModel")
const AuthorModel = require("../models/authorModel")


const createBook= async function (req, res) {
    let data= req.body

    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let authorData = await AuthorModel.find({author_Name:"Chetan Bhagat"}).select({_id : 1})
    let bookData = await bookModel.find({authorData})
    res.send(bookData)
}
const findTwoStates = async function (req, res){
    let bookData = await bookModel.findByIdAndUpdate({bookName:"Two states"},{price:100}, {new:true})
    res.send(bookData)
}

  


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.findTwoStates = findTwoStates