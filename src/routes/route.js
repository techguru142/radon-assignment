const express=require("express");
const router=express.Router();
const collegeController=require("../controller/college")
const internController=require("../controller/intern")



router.post("/functionup/interns",internController.createIntern);






module.exports = router;