const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.post("/createBook", BookController.createBook )

router.get("/bookList", BookController.allBooksList)

router.post("/yearDetails", BookController.yearDetails)

router.post("/particularBooks", BookController.particularBooks)

router.get("/priceDetails", BookController.priceDetails  )

router.get("/randomBooks", BookController.randomBooks)


//router.get("/test-me", function (req, res) {
  //  res.send("My first ever api!")
//})
module.exports=router;