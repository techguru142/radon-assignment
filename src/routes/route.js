const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/authorController')
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", AuthorController.createAuthor  )

//router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get('/allbook', BookController.allBook)

router.get("/getBooksData", BookController.getBooksData)

router.get('/findTwoStates', BookController.findTwoStates)

router.get('/findBook', BookController.findBook)

module.exports = router;