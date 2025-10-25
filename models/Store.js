const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String },
    city: { type: String },
    sales: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = storeSchema
