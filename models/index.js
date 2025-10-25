const mongoose = require("mongoose")

const userSchema = require("./User")
const storeSchema = require("./Store")

const User = mongoose.model("User", userSchema)
const Store = mongoose.model("Store", storeSchema)

module.exports = {
  User,
  Store,
}
