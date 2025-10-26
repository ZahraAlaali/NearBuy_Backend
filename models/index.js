const mongoose = require("mongoose")

const userSchema = require("./User")
const storeSchema = require("./Store")
const itemSchema=require("./Item")
const orderSchema=require("./Order")

const User = mongoose.model("User", userSchema)
const Store = mongoose.model("Store", storeSchema)
const Item = mongoose.model("Item", itemSchema)
const Order = mongoose.model("Order", orderSchema)

module.exports = {
  User,
  Store,
  Item,
  Order
}


