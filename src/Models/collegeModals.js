const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { require: true, unique: true },
    fullName: { require: true },
    logoLink: { require: true },
    isDeleted: { boolean, default: false },
  },
  { timestamps:true }
);

module.exports=mongoose.model("college",collegeSchema);