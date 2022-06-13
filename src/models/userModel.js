const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance: String,
    adress: String,
    age:Number,
    gender: {
        type: String,
        enum: ["male", "female", "other"] 
    },
   isFreeAppUser:{type:Boolean, default:false},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) 



// String, Number
// Boolean, Object/json, array