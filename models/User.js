const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String },
    role: { type: String, enum: ["customer", "business"], required: true },
  },
  { timestamps: true }
)

module.exports = userSchema
