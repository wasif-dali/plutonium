const publisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publihserCreated = await publisherModel.create(publisher)
    res.send({data: publihserCreated})
}

module.exports.createPublisher= createPublisher