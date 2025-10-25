const mongoose = require("mongoose")

const userSchema = require("./User")
const itemSchema=require("./Item")
const User = mongoose.model("User", userSchema)
const Item = mongoose.model("Item", itemSchema)

module.exports = {
  User,
  Item
}
