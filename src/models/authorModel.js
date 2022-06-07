const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
 author_Name: {type:String, required:true},
 age: Number,
 adress: String
}, { timestamps: true });

module.exports = mongoose.model('Author', userSchema) //users



