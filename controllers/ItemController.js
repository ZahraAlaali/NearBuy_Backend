const { Item } = require("../models")
const allItems = async (req, res) => {
  let items = await Item.find({})
  res.send(items)
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
