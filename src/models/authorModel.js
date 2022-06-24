const mongoose = require('mongoose')
const validator = require('validator')

const authorSchema = new mongoose.Schema({
    fname:{
        type:String, 
        required:true,
    //     validate(value){
    //         if(!validator.isAlpha(value)){
    //          throw new Error("special character and numeric value can not be acepted")
    //         }
    //     }
     },
    lname:{
        type:String,
        required:true,
        // validate(value){
        //     if(!validator.isAlpha(value)){
        //      throw new Error("special character and numeric value can not be acepted")
        //     }
        // }
    },
    title:{
        type:String,
         required:true, 
         enum:["Mr","Mrs","Miss"],
         
        },
    email:{
        type:String,
        required:true, 
        unique:true,
    //    validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error("Email is invalid")
    //     }
    //    }
    },
    password:{
        type:String,
         required:true
        }
},{timestamps:true})
 module.exports = mongoose.model('Author', authorSchema)