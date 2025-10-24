const { User } = require("../models")
const middlewares = require("../middlewares")

const Register = async (req, res) => {
  try {
    let existEmail = await User.exists({
      email: req.body.email,
    })
    let existUsename = await User.exists({
      username: req.body.username,
    })
    if (existEmail || existUsename) {
      res
        .status(400)
        .send("A user with that email or username has already been registered!")
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

const Login = async (req, res) => {
  try {
    let user
    const userEmail = await User.findOne({ email: req.body.email })
    if (!userEmail) {
      const userUsername = await User.findOne({ username: req.body.email })
      if (!userUsername) {
        res.status(400).send("email or username is wrong, try again")
      } else {
        user = userUsername
      }
    } else {
      user = userEmail
    }

    let matched = await middlewares.comparePassword(
      req.body.password,
      user.password
    )
    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      }
      let token = middlewares.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register,
  Login,
}
