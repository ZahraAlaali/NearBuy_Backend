const { Order, Store, Item } = require("../models")
const newOrder = async (req, res) => {
  const { id, role } = res.locals.payload
  if (role !== "customer") {
    return res.status(403).send("Business cannot create orders")
  }
  let customerHasOrder = await Order.find({ customerId: id }).populate({
    path: "items.itemId",
  })
  let existingPendingOrder = customerHasOrder.find((order) => {
    return (
      String(order.storeId) === String(req.params.storeId) &&
      order.status !== "ready"
    )
  })
  if (existingPendingOrder) {
    for (let i = 0; i < req.body.items.length; i++) {
      let item = req.body.items[i]
      const dbItem = await Item.findById(item.itemId)
      const dbStore = await Store.findById(req.params.storeId)
      existingPendingOrder.storeName = dbStore.name
      // if (String(dbItem.storeId) !== String(req.params.storeId)) {
      //   return res.status(400).send("Item does not belong to this store")
      // }
      let oldItem = existingPendingOrder.items.find(
        (i) => String(i.itemId._id) === String(item.itemId)
      )
      if (oldItem) {
        oldItem.quantity += item.quantity
      } else {
        existingPendingOrder.items.push({
          itemId: item.itemId,
          itemName: dbItem.name,
          itemPrice: dbItem.price,
          quantity: item.quantity,
        })
      }
    }
    existingPendingOrder.price = 0
    existingPendingOrder.items.forEach((item) => {
      existingPendingOrder.price += item.quantity * item.itemPrice
    })
    await existingPendingOrder.save()
    return res.status(200).send(existingPendingOrder)
  } else {
    console.log("No existingPendingOrder")
    req.body.storeId = req.params.storeId
    req.body.customerId = id
    req.body.status = "pending"
    req.body.price = 0

    const dbStore = await Store.findById(req.params.storeId) // ✅ Add this

    for (let i = 0; i < req.body.items.length; i++) {
      let item = req.body.items[i]
      const dbItem = await Item.findById(item.itemId)
      if (!dbItem) {
        return res.status(400).send("Item not found")
      }
      if (String(dbItem.storeId) !== String(req.params.storeId)) {
        return res.status(400).send("Item does not belong to this store")
      }
      item.itemName = dbItem.name
      item.itemPrice = dbItem.price
      req.body.price += item.quantity * item.itemPrice
    }

    const order = await Order.create({
      storeId: req.body.storeId,
      customerId: req.body.customerId,
      status: req.body.status,
      price: req.body.price,
      storeName: dbStore.name,
      items: req.body.items,
    })

    return res.status(200).send(order)
  }
}

const getOrders = async (req, res) => {
  const { id, role } = res.locals.payload
  if (role == "customer") {
    let orders = await Order.find({ customerId: id })
    console.log(orders)
    res.send(orders)
  } else {
    let store = await Store.find({ ownerId: id })
    console.log(store)
    let orders = await Order.find({ storeId: store })
    console.log(orders)
    res.send(orders)
  }
}

module.exports = {
  newOrder,
  getOrders,
}
