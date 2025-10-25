const { Item } = require("../models")
const newItem = async (req, res) => {
  let existName = await Item.exists({
    name: req.body.name,
  })
  if (existName) {
    res.status(400).send("The item is already exists")
  } else {
    const item = await Item.create(req.body)
    res.status(200).send(item)
  }
}
const allItems=async(req,res)=>{
  let items= await Item.find({})
  res.send(items)
}
const editItem=async(req,res)=>{
  let item=await Item.findByIdAndUpdate(req.params.item_id, req.body, {new: true})
  res.send(item)
}
const deleteItem=async(req,res)=>{
  await Item.deleteOne({ _id:req.params.item_id})
  res.send({msg:"deleted"})
}
module.exports = {
  newItem,
  allItems,
  editItem,
  deleteItem
}
