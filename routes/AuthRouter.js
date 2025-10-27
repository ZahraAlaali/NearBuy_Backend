const router = require("express").Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const AuthCtrl = require("../controllers/AuthController")
const middlewares = require("../middlewares")

router.post("/register",upload.single("picture"), AuthCtrl.Register)

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
