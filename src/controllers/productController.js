const productModel= require("../models/productModel")


const createProduct= async function (req, res) {
    let product = req.body
    let productCreated = await productModel.create(product)
    res.send({data: productCreated})
}

module.exports.createProduct=createProduct