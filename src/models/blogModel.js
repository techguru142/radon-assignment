const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
    type:ObjectId,
    required:true,
    ref:"Author"
    },
    tags:[String],
    catagory:{
        type:[String],
        required:true,
    },
    subCatagory:[String],
    isDeleted:{
        type:Boolean,
         default:false
        },
        isPublished:{
            type:Boolean,
            default:false
        },
   deletedAt:{type:Date},
   publishdAt:{type:Date}
},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)