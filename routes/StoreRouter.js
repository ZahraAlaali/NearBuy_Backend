const router = require("express").Router()
const middlewares = require("../middlewares")

const storeCtrl = require("../controllers/StoreController")

router.post(
  "/create",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.createStore
)

module.exports = router
