const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/InventoryController");

// GET /inventory
router.get("/", inventoryController.getAllInventory);

// GET /inventory/:id
router.get("/:id", inventoryController.getInventoryById);

// POST /inventory
router.post("/", inventoryController.createInventory);

// PUT /inventory/:id
router.put("/:id", inventoryController.updateInventory);

// DELETE /inventory/:id
router.delete("/:id", inventoryController.deleteInventory);

// PUT /inventory/restock/:id
router.put("/restock/:id", inventoryController.restockInventory);

module.exports = router;
