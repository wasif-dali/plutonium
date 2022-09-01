const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//  Authenticate Middleware 

const authenticate =  function(req, res, next){
    
  try{
    let token = req.headers["x-auth-token"];
  
  if (!token) return res.status(404).send({ msg: "token must be present" });    //If no token is present in the request header return error
  console.log(token);
  
  let decodedToken = jwt.verify(token, "functionup-plutonium");   // If a token is present then decode the token with verify function
  if (!decodedToken) 
  return res.status(500).send({status:false,msg:"token is invalid"})  
  req.token=decodedToken                                      // Input 1 is the token to be decoded and Input 2 was same as generated earlier
   
  
      next()
}catch(err){
return res.status(500).send({msg: "Server error or token is invalid" })
}
}

///Authorisation 

const authorise = async function(req, res, next){
  try{
    let token = req.headers["x-auth-token"];
        
    let decodedToken = jwt.verify(token, "functionup-plutonium");
    
    let userId = req.params.userId;
    let userDetails =  await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });

    let userToBeModified = req.params.userId;
    let userLoggedIn = decodedToken.userId
  
    if(userToBeModified != userLoggedIn) 
    return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'});

   

  next()
  }catch(error){
  res.send({ status: true, data: userDetails });
}
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
