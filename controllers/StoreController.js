const { Store, Item } = require("../models")

const createStore = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const userHasStore = await Store.findOne({ ownerId: id })
    if (userHasStore) {
      res.status(400).send("User already have store")
    } else {
      const store = await Store.exists({ name: req.body.name })
      if (store) {
        res.status(400).send("Store name alraedy exists")
      } else {
        const { id, role } = res.locals.payload
        console.log(id, role)
        if (role === "business") {
          req.body.ownerId = id
          req.body.sales = 0
          const newStore = await Store.create(req.body)
          res.status(200).send(newStore)
        } else {
          res.status(400).send("User is not an owner")
        }
      }
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

const updateStore = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const store = await Store.findById(req.params.storeId)
    console.log(store)
    if (store && store.ownerId.equals(id)) {
      store.set(req.body)
      await store.save()
      res.status(200).send(store)
    } else {
      res.status(400).send("User is not the owner")
    }
  } catch (error) {
    throw error
  }
}

const deleteStore = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const storeInDataBase = await Store.findOne({ _id: req.params.storeId })
    if (storeInDataBase && storeInDataBase.ownerId.equals(id)) {
      await Item.deleteMany({ storeId: req.params.storeId })
      await Store.deleteOne({ _id: req.params.storeId })
      res.status(200).send("deleted successfully")
    } else {
      res.status(400).send("User is not the owner")
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createStore,
  allStores,
  getStoresByFilter,
  updateStore,
  deleteStore,
}
