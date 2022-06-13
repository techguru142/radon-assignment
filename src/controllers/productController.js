const productModel = require('../models/productModel')
const createProduct = async function(req, res){
    let productData = req.body
    let savedProductData = await productModel.create(productData)
    res.send(savedProductData)
}

module.exports.createProduct = createProduct