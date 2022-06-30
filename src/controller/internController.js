const internModel = require("../Models/internModels");
const collegeModel = require("../Models/collegeModels");
const validator = require("validator");
const { isValidObjectId } = require("mongoose");

const createIntern = async function (req, res) {
  const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  const isValidBody = function (body) {
    return Object.keys(body).length > 0;
  };

  try {
    let requestBody = req.body;
    //-----------------------------VALIDATION START-----------------------------------//
    if (!isValidBody(requestBody))
      return res
        .status(400)
        .send({ status: false, msg: "Please provide intern details" });
    //extracting body keys
    const { name, email, mobile, collegeId, isDeleted } = requestBody;
    //for valid name
    if (!isValid(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid name" });

    if (typeof name!="string")
      return res
        .status(400)
        .send({ status: false, message: "Please provide name in string" });

    if (validator.isAlpha(name) === false)
      return res.status(400).send({
        status: false,
        message: "Please provide only Alphabets in name",
      });

    //for valid email
    if (!isValid(email))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid email" });

    if (validator.isEmail(email) === false)
      return res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });

    //for valid mobile
    if (!isValid(mobile))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid mobile" });
    if (typeof mobile ==="string")
      return res
        .status(400)
        .send({ status: false, message: "Please provide mobile number in Number format" });

    // if (validator.isNumeric(mobile) === false && mobile.length!=10)
    if(/^[789][0-9]{9}$/.test(mobile)==false)
      return res.status(400).send({
        status: false,
        message: `number should be valid mobile number & ${String(mobile).length} is not equal to 10`,
      });

    if (!isValid(collegeId))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid collegeId." });
    if (collegeId.length!=24)
      return res
        .status(400)
        .send({ status: false, message: `Please provide 24 digit id.${collegeId.length} not allowed` });
    
    if (isDeleted == true)
      return res
        .status(400)
        .send({
          status: false,
          msg: "Intern Details has been already Deleted",
        });

    //for unique items;-
    const isNumberAlreadyUsed = await internModel.findOne({ mobile });
    if (isNumberAlreadyUsed)
      return res.status(400).send({
        status: false,
        message: `${mobile} number is already registered`,
      });

    const isEmailAlreadyUsed = await internModel.findOne({ email });
    if (isEmailAlreadyUsed)
      return res.status(400).send({
        status: false,
        message: `${email} email is already registered`,
      });

    //-------------------------VALIDATION ENDS-------------------------------//

    //checking college name by finding in college collection
    let collegeName = req.body.collegeName;
    // console.log(collegeName)
    let collegeData = await collegeModel.findOne({ name:collegeName });
    
    if (!collegeData)
      return res.status(400).send({
        status: false,
        message: `${collegeName} is not a valid college name `,
      });

    const validCollegeID = collegeData._id;
    
    //collection all the data and storing it in a varibale
    const internData = { name, email, mobile, collegeId:validCollegeID };
    // console.log(internData)
    const createIntern = await internModel.create(internData);
    return res.status(201).send({
      status: true,
      message: `Intern created successfully`,
      data: createIntern,
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createIntern = createIntern;


const getCollegeDetails = async function (req, res) {
  try {
    let queryData = req.query;
    if (!queryData.name)
      return res.status(400).send({status:false,msg:"Oops! key have empty space or invalid name"});

    if (Object.keys(queryData).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "please enter data in query" });

    let collegeData = await collegeModel
      .findOne({ name: queryData.name })
      .select({ name: 1, fullName: 1, logoLink: 1, isDeleted: 1, _id: 0 });
    if (!collegeData)
      return res
        .status(400)
        .send({ status: false, msg: "Oops! data not found" });

    let internData = await internModel
      .find({ collegeName: queryData.name })
      .populate("collegeId")
      .select({ collegeId: 0 });
    let data = {
      name: collegeData.name,
      fullName: collegeData.fullName,
      logoLink: collegeData.logoLink,
      isDeleted: collegeData.isDeleted,
      intern: internData,
    };
    res.status(200).send({ data: data });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.getCollegeDetails = getCollegeDetails;
