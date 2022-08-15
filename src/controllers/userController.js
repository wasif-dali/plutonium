const bookModel= require("../models/userModel")

////////const createUser= async function (req, res) {
    ///////let data= req.body
    ///let savedData= await UserModel.create(data)
    //res.send({msg: savedData})
//}

//co///nst getUsersData= async function (req, res) {
  ////  et allUsers= await UserModel.find()
    ///res.send({msg: allUsers})
////}
const createbook= async function (req, res) {
    let data= req.body
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getbookData= async function (req, res) {
    let allbooks= await bookModel.find()
    res.send({msg: allbooks})
}

     module.exports.createbook= createbook
     
     module.exports.getbooksData= getbookData
