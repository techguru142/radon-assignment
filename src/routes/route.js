const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const commonMiddlewares = require('../middlewares/commonMiddlewares')

router.post("/createUser",commonMiddlewares.headerValidation, userController.createUser  )




module.exports = router;