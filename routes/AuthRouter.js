const router = require("express").Router()

const AuthCtrl = require("../controllers/AuthController")
const middlewares = require("../middlewares")

router.post("/register", AuthCtrl.Register)

router.post("/login", AuthCtrl.Login)

module.exports = router
