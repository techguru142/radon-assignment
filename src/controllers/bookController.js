const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')
const publisherModel = require('../models/publisherModel')

const createBook = async function(req, res){
    let bookData = req.body
    let authorId = bookData.author_id
    //Condition-1
    if(!authorId) res.send("Author id is required")
    //condition-2
    let pubId = bookData.publisher_id
    if(!pubId) res.send("Publisher id is required")
    //condition-3
    let savedAuthData = await authorModel.findById(authorId)
    if(!savedAuthData) res.send("Invalid author id")
    //condition-4
    let savedPubData = await publisherModel.findById(pubId)
    if(!savedPubData) res.send("Invalid publisher id")

    let savedData = await bookModel.create(bookData)
    res.send(savedData)
}

const getAllBooks = async function(req, res){
    let savedData = await bookModel.find()
    res.send(savedData)
}

module.exports.createBook = createBook
module.exports.getAllBooks = getAllBooks