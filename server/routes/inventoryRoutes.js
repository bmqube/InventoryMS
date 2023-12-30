const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/InventoryController");

// GET /inventory
router.get("/", inventoryController.getAllInventory);

// POST /inventory
router.post("/", inventoryController.createInventory);

// PUT /inventory/:id
router.put("/:id", inventoryController.updateInventory);

// DELETE /inventory/:id
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
