const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate =  function(req, res, next)
{
    
  
    let token = req.headers["x-Auth-Token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });    //If no token is present in the request header return error
  console.log(token);
  
  let decodedToken = jwt.verify(token, "functionup-plutonium");   // If a token is present then decode the token with verify function
  if (!decodedToken)                                         // Input 1 is the token to be decoded and Input 2 was same as generated earlier
    return res.send({ status: false, msg: "token is invalid" });
  
      next()
};
 

const authorise = async function(req, res, next)
{
    let token = req.headers["x-auth-token"];
        
    let decodedToken = jwt.verify(token, "functionup-plutonium");
    
    let userId = req.params.userId;
    let userDetails =  await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });

    let userToBeModified = req.params.userId;
    let userLoggedIn = decodedToken.userId
  
    if(userToBeModified != userLoggedIn) 
    return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'});

    res.send({ status: true, data: userDetails });

  next()
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise