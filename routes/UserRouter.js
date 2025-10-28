const router = require("express").Router()
const middlewares = require("../middlewares")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const userCtrl = require("../controllers/UserController")

router.put(
  "",
  upload.single("picture"),
  middlewares.stripToken,
  middlewares.verifyToken,
  userCtrl.updateProfile
)

module.exports = router
