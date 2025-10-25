const { Store } = require("../models")
const { CheckSession } = require("./AuthController")

const createStore = async (req, res) => {
  try {
    const store = await Store.exists({ name: req.body.name })
    if (store) {
      res.status(400).send("Store name alraedy exists")
    } else {
      const { id } = res.locals.payload
      req.body.ownerId = id
      req.body.sales = 0
      const newStore = await Store.create(req.body)
      res.status(200).send(newStore)
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createStore,
}
