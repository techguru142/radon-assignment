const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middlewares = require("../middlewares/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",middlewares.checkAuth, userController.getUserData)

router.put("/users/:userId",middlewares.checkAuth, userController.updateUser)

router.delete("/users/:userId",middlewares.checkAuth, userController.deleteUser)

router.post("/users/:userId/posts",middlewares.checkAuth, userController.postMessage)

module.exports = router;