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
    picture: { type: String },
    category: [{ type: String }],
    city: { type: String },
  },
  { timestamps: true }
)

module.exports = storeSchema
