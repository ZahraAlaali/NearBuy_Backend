const { Schema } = require("mongoose")

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true  },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = itemSchema
