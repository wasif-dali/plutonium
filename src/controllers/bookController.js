const { count } = require("console")
const BookModel= require("../models/bookModel")
const UserModel= require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const listBooks= async function (req, res) {
    let findauthor = await UserModel.find({author_name : "Chetan Bhagat"});
    let findbook = await BookModel.find({author_id : {$eq : findauthor[0].author_id}});
  res.send({ msg : findbook});
}


const updatebook = async function (req,res) {
  let bookprice = await BookModel.findOneAndUpdate({ name : "Two states"},{$set : { price : 100} }, {new : true});
  let updateprice = bookprice.price;
  let authorupdate = await UserModel.find({author_id : {$eq : bookprice.author_id}}).select({author_name:1,_id:0});
  res.send({authorupdate ,updateprice});
}


const bookrange = async function(req,res) {
  let range = await BookModel.find({price : {$gte:50,$lte:100}});
   let a = range.map(x=>x.author_id);
   let newrange = await UserModel.find({author_id : a}).select({author_name:1, _id:0});
  res.send(newrange);
}
//const getBooksData= async function (req, res) {
  //  let allBooks= await BookModel.find( {authorName : "HO" } )
    //console.log(allBooks)
    //if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    //else res.send({msg: "No books found" , condition: false})
//}


//const updateBooks= async function (req, res) {
  //  let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    //let allBooks= await BookModel.findOneAndUpdate( 
        //{ authorName: "ABC"} , //condition
      ///  { $set: data }, //update in data
        //{ new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     //)
     
//     res.send( { msg: allBooks})
//}

//const deleteBooks= async function (req, res) {
    // let data = req.body 
 //   let allBooks= await BookModel.updateMany( 
   //     { authorName: "FI"} , //condition
     //   { $set: {isDeleted: true} }, //update in data
       // { new: true } ,
     //)
     
    // res.send( { msg: allBooks})
//}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook;
module.exports.listBooks=listBooks;
module.exports.updatebook=updatebook;
module.exports.bookrange=bookrange;

