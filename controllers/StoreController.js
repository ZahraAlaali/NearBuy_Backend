const { Store } = require("../models")

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

const allStores = async (req, res) => {
  try {
    const stores = await Store.find()
    res.status(200).send(stores)
  } catch (error) {
    throw error
  }
}

const getStoresByFilter = async (req, res) => {
  try {
    const { city, category } = req.body
    let stores = await Store.find()
    if (city !== "all") {
      stores = stores.filter((store) => {
        return store.city.toLowerCase() === city.toLowerCase()
      })
    }
    if (category !== "all") {
      stores = stores.filter((store) => {
        return store.category.includes(category)
      })
    }
    res.status(200).send(stores)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createStore,
  allStores,
  getStoresByFilter,
}
