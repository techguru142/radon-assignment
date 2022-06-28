const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Schema.type.ObjectId;

let internSchema = new mongoose.Schema({
  name: { require: "Please Enter Name" },
  email: {
    type: String,
    unique: true,
    required: "Please enter email",
  },
  mobile: { require: "Please enter mobile number", unique: true },
  collegeId: {
    type: ObjectId,
    ref: college,
    isDeleted: { type: boolean, default: false }
  },
});

module.exports=model("intern",internSchema);