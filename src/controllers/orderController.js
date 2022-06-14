const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createOrder = async function(req,res){
    let orderData = req.body
    let userId = orderData.userId
    let User = await userModel.findById(userId)
    if(!User){
         return res.send({status:false, msg:"invalid user id"})
    }
    let productId =orderData.productId
    let Product = await productModel.findById(productId)
    if(!Product){
         return res.send({status:false, msg:"invalid user id"})
    }
    //Scenario 1 : Paid app and user balance is greater than or equal to product price
    if(req.headers.isfreeappuser == false && User.balance >= Product.price){
        User.balance = User.balance - Product.price
        orderData.isFreeAppUser
        let savedOrderData = await orderModel.create(orderData)
        return res.send(savedOrderData)
    }else if (req.headers.isfreeappuser ==false && user.balance<product.price){
        return res.send("user have insufficient balance")
    }else{
        orderData.amount =0
        orderData.isFreeAppUser = true
        let savedOrderData = await orderModel.create(orderData)
        res.send(savedOrderData)
    }
 }


module.exports.createOrder = createOrder