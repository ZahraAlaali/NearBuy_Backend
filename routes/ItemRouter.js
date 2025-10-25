const router = require("express").Router()

const ItemCtrl = require("../controllers/ItemController")
router.post("/",ItemCtrl.newItem)
router.get("/",ItemCtrl.allItems)
router.put("/:item_id",ItemCtrl.editItem)
router.delete("/:item_id",ItemCtrl.deleteItem)


module.exports = router
