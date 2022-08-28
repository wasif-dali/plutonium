const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const createOrder = async function (req, res) {
    let order = req.body
    let a = await userModel.findById(order.userId)
    let b = await productModel.findById(order.productId)
    let Total = b.price
    let deduct = a.balance - Total
    if (!a) { return res.send("invalid userId") }
    else if (!b) { return res.send("invalid productId") }
    if (req.body.isFreeAppUser === false){
        req.body["amount"] = b.price
        console.log(req.body["amount"])
        if (order.amount <= a.balance) {
            let balUpdate = await userModel.findOneAndUpdate({ _id:order.userId},{$set:{balance:deduct}},{new:true})
            let orderCreated = await orderModel.create(order)
            res.send({ data: [orderCreated, balUpdate] })
        } else if (order.amount > a.balance) {
            return res.send({ oops: "Customer has in-sufficient balance" })
        }
    }
}

module.exports.createOrder = createOrder