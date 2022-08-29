//const jwt = require("jsonwebtoken")

const mid = function (req, res, next) {
    let token = req.headers["x-auth-token"];
    if (!token) { return res.send({ status: false, msg: "token must be present" }) }
    else {
        next();
    }
}

module.exports={mid}