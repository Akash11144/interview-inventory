const mongoose = require("mongoose");

const inventory = {
  productId: Number,
  name: String,
  quantity: Number,
  price: Number,
  description: String,
  createdAt: Number,
  updatedAt: Number,
};

const inventoryModel = mongoose.model("inventory", inventory);

module.exports = inventoryModel;
