const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
  bookName:{
      type:String, 
      required:true
    },
    authorName:String,
    tags:[String],
    totalPages:Number,
    stockAvailable:Boolean,
    year:{
        type:Number,
        default:2021
    },
    price:{
        type:String,
        indian:INR,
        europe:EURO
    }

}, { timestamps: true });


module.exports = mongoose.model('Book1', bookSchema) 

