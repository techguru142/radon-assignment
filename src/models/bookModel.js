const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema( {
    bookName: {type:String, required:true}, 
    author_Id: String,
    price: Number,
    rating:Number
 
}, { timestamps: true });


module.exports = mongoose.model('Book2', bookSchema) //users


