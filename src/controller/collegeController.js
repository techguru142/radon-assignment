// const mongoose = require("mongoose");
const collegeModels = require("../Models/collegeModels");
// const internModels = require("../models/internModels");
const validator = require("validator");

const createCollege = async function (req, res) {
  const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false; //Here it Checks that Is there value is null or undefined
    if (typeof value === "string" && value.trim().length === 0) return false; // Here it Checks that Value contain only Space
    return true;
  };
  const isValidReqBody = function (body) {
    //  console.log(body)
    return Object.keys(body).length > 0; // it Checks Any Key is Present or not
  };

  try {
    let data = req.body;
    const { name, fullName, logoLink } = data;

    if (!isValidReqBody(data))
      return res.status(400).send({
        status: false,
        message: "Please Enter Valid College Details To Create College",
      });

    if (!isValid(name))
      return res.status(400).send({
        status: false,
        message: "Please Provide College Name To Create College",
      });

    if (validator.isAlpha(name) == false)
      return res
        .status(400)
        .send({ status: false, message: "name must be in aplhabets" });

    if (!isValid(logoLink))
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Logo Link" });

    if (!isValid(fullName))
      return res.status(400).send({
        status: false,
        message: "Please Provide College Full Name To Create College",
      });

    //Unique items
    const duplicatefullNames = await collegeModels.findOne({ name: name });

    if (duplicatefullNames)
      return res.status(400).send({ message: `${name} is Already Exists` });

    const collegeData = { name, fullName, logoLink };

    const collegeInfo = await collegeModels.create(collegeData);
    res.status(201).send({
      status: true,
      message: "College Created Successfully",
      data: collegeInfo,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.createCollege = createCollege;
