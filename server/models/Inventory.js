const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for the inventory."],
    maxLength: 50,
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the inventory."],
    maxLength: 500,
  },
  quantity: {
    type: Number,
    required: [true, "Please enter a quantity for the inventory."],
  },
  cost: {
    type: Number,
    required: [true, "Please enter a cost for the inventory."],
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);
