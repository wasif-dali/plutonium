const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook = async function (req, res) {
    const book = req.body
    let savedBook = await BookModel.create(book)
    res.send({ msg: savedBook })
}


const allBooksList = async function (req, res) {
    let allBooks = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0 })
    res.send({ msg: allBooks })
}

const yearDetails = async function (req, res) {
    let yearList= await BookModel.find({ year: req.body.year }).select({bookName:1,_id:0})
    res.send(yearList)
 }

 const particularBooks = async function (req, res) {
    
    let specificBooks = await BookModel.find(req.body)
    res.send({msg:specificBooks})
}

const priceDetails= async function(req,res){
    let list = await BookModel.find({"prices.indianPrice": {$in: ["100INR", "200INR","500 INR"]}} ).select({bookName:1,_id:0})
    res.send({ msg: list })
}

const randomBooks= async function(req, res) {
    let allBooks = await BookModel.find({$or:[ {stockAvailable: true},{ totalPages: {$gt: 500}}]})
    res.send({msg: allBooks })
}

module.exports.createBook = createBook
module.exports.allBooksList= allBooksList
module.exports.yearDetails = yearDetails
module.exports.particularBooks = particularBooks
module.exports.priceDetails  = priceDetails
module.exports.randomBooks = randomBooks
// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {

    // let allBooks= await BookModel.find( ).count() // COUNT

    // let allBooks= await BookModel.find( { authorName : "Chetan Bhagat" , isPublished: true  } ) // AND
    
    // let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
    // } ).select( { bookName: 1, authorName: 1, _id: 0})n // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


    //  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
    //  let allBooks= await BookModel.findOne( {sales: 10}) 
    //  let allBooks= await BookModel.find( {sales: 10}) 
    
    

    // //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  sales: {$gt: 10}  }, //condition
    //     { $set: { isPublished: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= aw…