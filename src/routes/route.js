const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const commonMiddlewares = require('../middlewares/commonMiddlewares')

router.post("/createUser",commonMiddlewares.headerValidation, userController.createUser  )
router.post('/createProduct', productController.createProduct)
router.post('/createOrder', commonMiddlewares.headerValidation, orderController.createOrder)



module.exports = router;