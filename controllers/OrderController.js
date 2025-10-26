const { Order, Store } = require("../models")
const newOrder = async (req, res) => {
  console.log(res.locals.payload)
  const { id, role } = res.locals.payload
  if (role == "customer") {
    req.body.storeId = req.params.storeId
    req.body.customerId = id
    req.body.price = 0
    req.body.items.forEach((item) => {
      item.itemName = req.body.price += item.quantity * item.itemPrice
    })
    console.log(req.body.price)
    const order = await Order.create(req.body)
    res.status(200).send(order)
  } else {
    res.send("business can not create orders")
  }
}

const getOrders = async (req, res) => {
  const { id, role } = res.locals.payload
  if (role == "customer") {
    let orders=await Order.find({customerId:id})
    console.log(orders)
    res.send(orders)
  }else{
    let store=await Store.find({ownerId:id})
      console.log(store)
      let orders=await Order.find({storeId:store})
      console.log(orders)
      res.send(orders)
    }
}
module.exports = {
  newOrder,
  getOrders
}
