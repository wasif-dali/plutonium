const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



//Problem 1 //

const createUser = async function (req, res) {         //You can name the req, res objects anything
  try {
    let data = req.body;                                 //but the first parameter is always the request
  let savedData = await userModel.create(data);
  res.status(201).send({msg: savedData})         //the second parameter is always the response
  //xyz.send({ msg: savedData });
  }
  catch(error){
    //console.log(error.message)
    res.status(500).send({msg: "Error", error: error.message})

  }
};                      

//PROBLEM 2 //

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
 
  if (!user)
     return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    });
  
 
  let token = jwt.sign(                  // Once the login is successful, create the jwt token with sign function
    {
      userId: user._id.toString(),      // Input 1 is the payload or the object containing data to be set in token
      batch: "plutonium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium"                  // Input 2 is the secret
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
  } catch(Error) {
    res.status(500).send({msg: "Error", error:Error.message})
  }
};


///problem 3///

const getUserData =  function (req, res) { 
  
};


//problem 4//


const updateUser = async function (req, res) { 

  let userId = req.params.userId;
 let userDetails =  userModel.findById(userId);         
   if (!userDetails)
     return res.send({ status: false, msg: "No such user exists" });   //Return an error if no user with the given id exists in the db

  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);  
  res.send({ status: updatedUser, data: updatedUser });
};

// problem 5///
  
const deleteUser = async function(req, res){

  let userId = req.params.userId; 
  let userDetails =  userModel.findById(userId);         
  if (!userDetails)
     return res.send({ status: false, msg: "No such user exists" });   //Return an error if no user with the given id exists in the db


  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },{$set : {isDeleted: true}}, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

//Problem 6///

const postMessage = async function(req, res){
  let message = req.body.message
      
  let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts

    updatedPosts.push(message)    //add the message to user's posts
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{$set :{posts: updatedPosts}}, {new: true})
    return res.send({status: true, data: updatedUser})    //return the updated user document
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage
