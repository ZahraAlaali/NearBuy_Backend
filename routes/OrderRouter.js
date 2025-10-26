const router = require("express").Router()
const middlewares = require("../middlewares/index.js")
const OrderCtrl = require("../controllers/OrderController")
router.post("/:storeId/new",middlewares.stripToken, middlewares.verifyToken, OrderCtrl.newOrder)
router.get("/",middlewares.stripToken, middlewares.verifyToken, OrderCtrl.getOrders)

module.exports = router
