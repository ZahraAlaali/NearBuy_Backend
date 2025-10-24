const router = require("express").Router()

const AuthCtrl = require("../controllers/AuthController")
const middlewares = require("../middlewares")

router.post("/register", AuthCtrl.Register)

module.exports = router
