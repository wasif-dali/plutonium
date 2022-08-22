const UserModel= require("../models/userModel")

const createauthor= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

//const getUsersData= async function (req, res) {
  //  let allUsers= await UserModel.find()
    //res.send({msg: allUsers})
//}

module.exports.createauthor= createauthor
//module.exports.getUsersData= getUsersData