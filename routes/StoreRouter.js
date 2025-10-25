const router = require("express").Router()
const middlewares = require("../middlewares")

const storeCtrl = require("../controllers/StoreController")

router.post(
  "/create",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.createStore
)

router.get(
  "/",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.allStores
)

router.post(
  "/filter",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.getStoresByFilter
)

module.exports = router
