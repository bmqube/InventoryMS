const express = require("express");
const router = express.Router();
const inventoryController =
  require("../controllers/InventoryController").default;

// GET /inventory
router.get("/inventory", inventoryController.getAllInventory);

// POST /inventory
router.post("/inventory", inventoryController.createInventory);

// PUT /inventory/:id
router.put("/inventory/:id", inventoryController.updateInventory);

// DELETE /inventory/:id
router.delete("/inventory/:id", inventoryController.deleteInventory);

module.exports = router;
