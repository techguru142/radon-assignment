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
        type:String,
        default:2021,
    },
    price:{
        indian:String,
        european:String
    }

}, { timestamps: true });


module.exports = mongoose.model('Book1', bookSchema) 

