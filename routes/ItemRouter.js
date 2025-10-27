const router = require("express").Router()
const middlewares = require("../middlewares/index.js")
const ItemCtrl = require("../controllers/ItemController")
router.post(
  "/:storeId",
  middlewares.stripToken,
  middlewares.verifyToken,
  ItemCtrl.newItem
)
router.get("/", middlewares.stripToken,
  middlewares.verifyToken,ItemCtrl.allItems)
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
