const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    comment: { type: String },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        quantity: { type: Number, required: true },
        itemPrice: { type: Number, required: true },
      },
    ],
    price: { type: Number, required: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "received", "ready"],
    },
  },
  { timestamps: true }
)

module.exports = orderSchema
