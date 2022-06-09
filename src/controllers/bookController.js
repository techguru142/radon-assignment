
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
//find the book written by Chetan Bhagat
const getBooksData= async function (req, res) {
    let authorData = await AuthorModel.find({author_Name:"Chetan Bhagat"}).select({author_id:1, _id:0})
  console.log(authorData)
 let a =authorData[0].author_id
    let bookData = await bookModel.find({author_Id:a}).select({bookName:1})

    res.send(bookData)
}

const findTwoStates = async function (req, res){
    let bookData = await bookModel.findOneAndUpdate({bookName:"Two states"},{$set:{price:100}},{new:true}).select({author_Id:1, price:1, _id:0})
    let b = bookData.author_Id
    let price = bookData.price
   // console.log(b)
    let authorData = await AuthorModel.find({author_id:b}).select({author_Name:1})

   // console.log(price)
    res.send({msg:authorData,price})
}

const findBook = async function(req, res){
    let bookData = await bookModel.find({price:{$gte:50, $lte:100}}).select({author_Id:1, _id:0})
  const data = bookData.forEach(item =>{
       let a = item.author_Id
   
   })
 
   let allBook = await AuthorModel.find({author_Id:data}).select({author_Name:1});
    res.send(allBook)
    
}
  
//additional problem
const booksByAuthorId = async function(req, res){
let data= req.params
let dataId= data.author_id
let savedData = await bookModel.find({author_Id:dataId}).select({bookName:1, _id:0})
res.send(savedData)
}

const listOfAuthors = async function(req, res){
   let bookData = await bookModel.find({rating:{$gte:4}}).select({author_Id:1}) 
   const allData= bookData.forEach(item =>{
       let allId = item.author_Id
       
   })
  
let savedData = await AuthorModel.find({author_Id:allData,age:{$gte:50}}).select({author_Name:1, age:1})

res.send(savedData)
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.findTwoStates = findTwoStates
module.exports.findBook = findBook
module.exports.allBook = allBook
module.exports.booksByAuthorId= booksByAuthorId
module.exports.listOfAuthors = listOfAuthors