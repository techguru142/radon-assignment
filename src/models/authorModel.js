const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
 author_id:{type:Number, required:true, },   
 author_Name:String, 
 age: Number,
 adress: String
}, { timestamps: true });

module.exports = mongoose.model('Author', userSchema) //users



