const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
bookName: String,
authorName: String,
catagory: [],
year: String

},{timestamps:true});
    
    

module.exports = mongoose.model('Book', bookSchema) //users



