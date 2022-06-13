const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    name: String,
    catagory:String,
    price:{
        type:Number,
        required:true
     },

}, { timestamps: true });

module.exports = mongoose.model('Product', authorSchema)
