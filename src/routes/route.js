const express = require('express');
const externalModule = require('./logger')
const helper = require("../util/helper")
const validator = require("../validator/formatter")

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     console.log('The constant in logger route has a value '+externalModule.endpoint)
//     console.log('The current batch is '+externalModule.batch)
//     externalModule.log()
//     res.send('My first ever api!')
// });

// router.get('/test-me1', function (req, res) {
//     res.send('My second ever api!')
// });

// router.get('/test-me2', function (req, res) {
//     res.send('My third api!')
// });

// router.get('/test-me3', function (req, res) {
//     res.send('My 4th api!')
// });

// router.get('/test-me4', function (req, res) {
//     res.send('My last api!')
// });
router.get('/test-me', function(req,res){
    //Problem1 Solution
    externalModule.welcome()
    
    //Problem2 Solution
    helper.printDate()
    helper.printMonth()
    helper.getBatchInfo()

    //Problem3 Solution
    validator.trimString()
    validator.changeCaseToLower()
    validator.changeCaseToUpper ()
    res.send('My first ever api')
})

module.exports = router;
// adding this comment for no reason