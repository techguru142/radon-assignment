const express = require('express');
const router = express.Router();
const middlewares = require("../middlewares/validator")
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/authors', authorController.createAuthor)
router.post('/blogs', blogController.createBlog)
router.post('/login', authorController.loginAuthor)
router.get('/blogs', blogController.getBlogData)
router.put('/blogs/:blogId', blogController.updateBlog)
router.delete('/blogs/:blogId',blogController.deleteByParams)
router.delete('/blogs', blogController.deleteByQueryParams)



module.exports = router;