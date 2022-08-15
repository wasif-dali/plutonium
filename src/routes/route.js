const express = require('express');
const router = express.Router();
const bookModel = require("../models/userModel.js")
const bookController= require("../controllers/userController")




router.post("/createbook", bookController.createbook  )


router.get("/getbookData", bookController.getbooksData)



module.exports = router;