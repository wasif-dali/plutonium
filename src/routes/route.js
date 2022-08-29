const express = require("express")
const router = express.Router();
const controller = require("../controllers/newUserController")
const mw = require("../middleWare/auth")


router.post('/createUser',controller.createUser)
router.post('/loginUser',controller.login)
router.get('/users/:userId',mw.mid,controller.validate)
router.put('/users/:userId',mw.mid,controller.updation)
router.delete('/users/:userId',mw.mid,controller.deletion)


module.exports = router;