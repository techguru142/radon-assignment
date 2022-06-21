const express = require('express');
const router = express.Router();


const cowinController = require("../controllers/cowinController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.get("/cowin/districtById", cowinController.districtById)

router.get("/sortCityByTemp",cowinController.citySortingByTemp)

router.post('/memes', cowinController.memesChallenge)




module.exports = router;