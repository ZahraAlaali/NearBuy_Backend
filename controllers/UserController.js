const { User } = require("../models")

const updateProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const usernameInDatabase = await User.findOne({
      username: req.body.username,
    })
    if (usernameInDatabase && !usernameInDatabase._id.equals(id)) {
      res.status(400).send("choose another username")
    }
    const emailInDatabase = await User.findOne({ email: req.body.email })
    if (emailInDatabase && !emailInDatabase._id.equals(id)) {
      res.status(400).send("choose another email")
    }
    if (req.file) {
      req.body.picture = `/uploads/${req.file.filename}`
    }
    const update = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).send(update)
  } catch (error) {
    throw error
  }
}

module.exports = {
  updateProfile,
}
