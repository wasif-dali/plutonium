const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body

    //3 a)
    if(!book.author) {
        return res.send({status: false, msg: "author id is a mandatory field"})
    }

    //3 b)
    let author = await authorModel.findById(book.author)
    if(!author) {
        return res.send({status: false, msg: "Author id is not valid"})
    }

    //3 c)
    if(!book.publisher) {
        return res.send({status: false, msg: "Publisher id is a mandatory field"})
    }

    // 3 d)
    let publisher = await publisherModel.findById(book.publisher)
    if(!publisher) {
        return res.send({status: false, msg: "Publisher id is not valid"})
    }

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getAllBooksWithCompleteDetails = async function (req, res) {
    let allBooks = await bookModel.find().populate('author publisher')
    res.send({data: allBooks})

}

const updateSpecificBooks = async function(req, res) {
    //a)
    // get books by the publioshers - Penguin and HarperCollins
    let requiredPublishers = 
    await publisherModel.find({$or: [{name: "Penguin"},{name: "HarperCollins"}]}, {_id: 1})
    //let books = await bookModel.find().populate('publisher')
    //for
    let requiredPublisherIds = [] 
    for (let i = 0; i < requiredPublishers.length; i++) {
        requiredPublisherIds.push(requiredPublishers[i]._id)
    }

    let updatedBooks = await bookModel.updateMany({publisher : {$in: requiredPublisherIds}}, {isHardCover: true}, {new: true})
    res.send({data: updatedBooks})
}

module.exports.createBook= createBook
module.exports.getAllBooksWithCompleteDetails = getAllBooksWithCompleteDetails
module.exports.updateSpecificBooks = updateSpecificBooks