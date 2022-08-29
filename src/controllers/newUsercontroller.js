const model = require("../models/newusermodel.js")
const jwt = require("jsonwebtoken")
//user detail
const createUser = async function (req, res) {
    let enteredData = req.body
    let savedData = await model.create(enteredData)
    res.send({ UserData: savedData })
}

//login and genetrating token
const login = async function (req, res) {
    let user = req.body
    let logIn = await model.findOne({ emailId: user.emailId, password: user.password })
    if (!logIn) {
        return res.send({ Oops: "!!incorrect password or emailId!!" })
    }
    let token = jwt.sign(
        {
            userId: logIn._id.toString(),
            batch: "plutonium",
        },
        "black-and-white;)"
    );
    res.send({ status: true, token: token });
}

//validation


const validate = async function (req, res) {
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "black-and-white;)");
    if (!decodedToken) { return res.send({ status: false, msg: "token is invalid" }) }
    let userId = req.params.userId;
    let userDetails = await model.findById(userId);
    if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });
    res.send({ status: true, data: [userDetails,decodedToken ]});
}
//attribute updation


let updation = async function (req, res) {
    let abc = req.params.userId
    let updated = await model.findOneAndUpdate({ _id: abc }, { $set: { age: 25 } }, { new: true })
    res.send({ "successfully updated": updated })
}
//deletation

let deletion = async function (req, res) {
    let xyz = req.params.userId
    let deleted = await model.findOneAndUpdate({ _id: xyz }, { $set: { isDeleted: true } }, { new: true })
    res.send({data:deleted})

}

module.exports = { createUser, login, validate, updation, deletion }