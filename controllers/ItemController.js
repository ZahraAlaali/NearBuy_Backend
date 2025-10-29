const { Item, Store } = require("../models")

const allItems = async (req, res) => {
  // const payload = res.locals.payload
  // console.log(payload)
  // if (payload && payload.role == "business") {
  //   let store = await Store.findOne({ ownerId: payload.id })
  //     if (!store) {
  //       console.log("all")
  //       return res.send([])}
  //     let items = await Item.find({ storeId: store })
  //     console.log("business")
  //     return res.send(items)
  //   } else {
  //     let items = await Item.find({})
  //     console.log("empty")
  //     return res.send(items)
  //   }
  console.log(res.locals)
  const { id, role } = res.locals.payload
  if (role == "business") {
    let store = await Store.findOne({ ownerId: id })
    console.log(store)
    let items = await Item.find({ storeId: store._id })
    console.log(items)
    console.log("business")
    res.send(items)
  } else {
    let items = await Item.find({})
    console.log("customer")
    res.send(items)
  }
  // else{
  //   let store = await Store.find({ ownerId: id })
  //   console.log(store)
  //   let orders = await Order.find({ storeId: store })
  //   console.log(orders)
  //   res.send(orders)
  // }
}
const newItem = async (req, res) => {
  const { id, role } = res.locals.payload

  if (role == "business") {
    console.log(req.params.storeId)
    let existName = await Item.exists({
      name: req.body.name,
      storeId: req.params.storeId,
    })
    if (existName) {
      res.status(400).send("The item is already exists")
    } else {
      req.body.storeId = req.params.storeId
      if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`
      }
      const item = await Item.create(req.body)
      res.status(200).send(item)
    }
  } else {
    res.status(400).send("The customer can not create items")
  }
}
const editItem = async (req, res) => {
  const { id, role } = res.locals.payload
  let item = await Item.findById(req.params.item_id).populate("storeId")
  console.log(item)
  if (item.storeId.ownerId.equals(id) && role == "business") {
    let item = await Item.findByIdAndUpdate(req.params.item_id, req.body, {
      new: true,
    })
    res.send(item)
  } else {
    res
      .status(400)
      .send("ensure that the user is a business or he is the item's creator")
  }
}

const deleteItem = async (req, res) => {
  const { id, role } = res.locals.payload
  let item = await Item.findById(req.params.item_id).populate("storeId")
  if (item.storeId.ownerId.equals(id) && role == "business") {
    await Item.deleteOne({ _id: req.params.item_id })
    res.send({ msg: "deleted" })
  } else {
    res
      .status(400)
      .send("ensure that the user is a business or he is the item's creator")
  }
}
module.exports = {
  newItem,
  allItems,
  editItem,
  deleteItem,
}
