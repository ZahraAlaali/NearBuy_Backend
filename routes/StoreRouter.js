const router = require("express").Router()
const middlewares = require("../middlewares")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const storeCtrl = require("../controllers/StoreController")

router.post(
  "/create",
  upload.single("picture"),
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.createStore
)

router.get("/", storeCtrl.allStores)

router.get(
  "/owner",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.OwnerStore
)

router.post(
  "/filter",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.getStoresByFilter
)

router.put(
  "/update/:storeId",
  upload.single("picture"),
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.updateStore
)

router.delete(
  "/delete/:storeId",
  middlewares.stripToken,
  middlewares.verifyToken,
  storeCtrl.deleteStore
)

module.exports = router
