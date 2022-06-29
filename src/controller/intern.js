const internModel = require("../Models/internModels");
const collegeModel=require("../Models/collegeModals");
const validator=require("validator");


const createIntern = async function (req, res) {
 const isValid=function (value){
  if(typeof value==="undefined"||value===null)return false;
  if(typeof value==="string"&&value.trim().length===0)return false;
  return true;
 };
 const isValidBody=function(body){
  return Object.keys(body).length>0
 };
//  const regexMobile=/^[0-9]+$/
//  const regexEmail=/^[a-zA-Z_\-\.0-9]+[@][a-z]{3,6}[.][a-z]{2,5}$/
 try{
  let requestBody=req.body;
  //-----------------------------VALIDATION START-----------------------------------//
  if(!isValidBody(requestBody)){
    return res.status(400).send({status:false,msg:"Please provide intern details"});
  };
  //extracting body keys
  const { name, email, mobile, collegeName}=req.body;
  //for valid name
  if(!isValid(name)){
    return res.status(400).send({ status: false, message: 'Please provide valid name' });
  };
  if(validator.isAlpha(name)===false ){
    return res.status(400).send({ status: false, message: 'Please provide only Alphabets in name' })
  }
  //for valid email
  if(!isValid(email)){
    return res.status(400).send({ status: false, message: 'Please provide valid email' })
  };
  if(validator.isEmail(email)===false){
    return res.status(400).send({ status: false, message: `Email should be a valid email address` })
  };
  //for valid mobile
  if(!isValid(mobile)){
    return  res.status(400).send({ status: false, message: 'Please provide valid mobile' })
  };
  if(validator.isNumeric(mobile)===false){
    return res.status(400).send({ status: false, message: `number should be valid mobile number` });
  };
  if(!isValid(collegeName)){
    return res.status(400).send({ status: false, message: 'Please provide valid collegeName.'})
  };
  //for unique items;-
  const isNumberAlreadyUsed=await internModel.findOne({mobile:mobile});
  if(isNumberAlreadyUsed){
    return res.status(400).send({ status: false, message: `${mobile} number is already registered` })
  }
  const isEmailAlreadyUsed=await internModel.findOne({email:email});
  if(isEmailAlreadyUsed){
    return res.status(400).send({ status: false, message: `${email} email is already registered` })
  }
  //-------------------------VALIDATION ENDS-------------------------------//

  //checking college name by finding in college collection
  let CollegeID=req.body.collegeId;
  let collegeData=await collegeModel.findOne({collegeId:CollegeID});
  if(!collegeData){
    return res.status(400).send({ status: false, message: `${CollegeID} is not a valid college name `});
  };
  const validCollegeID=collegeData._id;
  //collection all the data and storing it in a varibale 
  const internData={name,email,mobile,collegeName}
  // console.log(internData)
  const createIntern=await internModel.create(internData);
  return res.status(201).send({ status: true, message: `Intern created successfully`, data: createIntern });

 }catch(error){
  return res.status(500).send({status:false,msg:error.message})
 }
};

module.exports.createIntern = createIntern;


