const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String },
    type: { type: String, enum: ["customer", "business"], required: true },
    amount: { type: Number },
  },
  { timestamps: true }
)

module.exports = userSchema
