const router = require("express").Router()
const middlewares = require("../middlewares/index.js")
const ItemCtrl = require("../controllers/ItemController")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

router.post(
  "/:storeId",
  upload.single("image"),
  middlewares.stripToken,
  middlewares.verifyToken,
  ItemCtrl.newItem
)
router.get(
  "/",
  middlewares.stripToken,
  middlewares.verifyToken,
  ItemCtrl.allItems
)
router.put(
  "/:item_id",
  middlewares.stripToken,
  middlewares.verifyToken,
  ItemCtrl.editItem
)
router.delete(
  "/:item_id",
  middlewares.stripToken,
  middlewares.verifyToken,
  ItemCtrl.deleteItem
)

module.exports = router
