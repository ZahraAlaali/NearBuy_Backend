const { User } = require("../models")
const middlewares = require("../middlewares")

const Register = async (req, res) => {
  try {
    let exist = await User.exists({ email })
    if (exist) {
      res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      if (req.body.password === req.body.confirmPassword) {
        let passwordDigest = await middlewares.hashPassword(req.body.password)

        req.body.password = passwordDigest

        const user = await User.create(req.body)

        res.status(200).send(user)
      } else {
        res
          .status(400)
          .send("The Password must be the same as Confirm Password")
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register,
}
