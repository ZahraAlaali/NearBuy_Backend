const router = require("express").Router()

const AuthCtrl = require("../controllers/AuthController")
const middlewares = require("../middlewares")

router.post("/register", AuthCtrl.Register)

router.post("/login", AuthCtrl.Login)

router.put(
  "/update/:id",
  middlewares.stripToken,
  middlewares.verifyToken,
  AuthCtrl.UpdatePassword
)

router.get(
  "/session",
  middlewares.stripToken,
  middlewares.verifyToken,
  AuthCtrl.CheckSession
)

module.exports = router
