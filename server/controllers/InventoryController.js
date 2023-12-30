// GET /api/inventory
const getAllInventory = async (req, res) => {
  try {
    // Retrive all inventory items from the database
    let allInventoryItems = await Inventory.find();

    // Send the response
    res.status(200).json({
      message: "Successfully retrieved all inventory items",
      data: allInventoryItems,
    });
  } catch (error) {
    // Send the error response
    res.status(500).json({
      message: "Error retrieving all inventory items",
      error: error.message,
    });
  }
};

// POST /api/inventory
const createInventory = async (req, res) => {
  // Destructure the request body
  const { name, description, quantity, cost } = req.body;
  try {
    // Create a new inventory item
    const newInventoryItem = new Inventory({
      name,
      description,
      quantity,
      cost,
    });

    // Save the new inventory item to the database
    await newInventoryItem.save();

    // Send the response
    res.status(201).json({
      message: "Successfully created a new inventory item",
      data: newInventoryItem,
    });
  } catch (error) {
    // Send the error response
    res.status(500).json({
      message: "Error creating a new inventory item",
      error: error.message,
    });
  }
};

// PUT /api/inventory/:id
const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, cost } = req.body;
  try {
    const infoToUpdate = {
      name,
      description,
      quantity,
      cost,
    };

    // Logic to update an inventory item in the database
    let updatedInventoryItem = await Inventory.findByIdAndUpdate(
      id,
      infoToUpdate,
      {
        new: true,
      }
    );

    // Send the response
    res.status(200).json({
      message: `Successfully updated inventory item with ID ${id}`,
      data: updatedInventoryItem,
    });
  } catch (error) {
    // Send the error response
    res.status(500).json({
      message: `Error updating inventory item with ID ${id}`,
      error: error.message,
    });
  }
};

// DELETE /api/inventory/:id
const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    let deletedInventoryItem = await Inventory.findByIdAndDelete(id);

    // Send the response
    res.status(200).json({
      message: `Successfully deleted inventory item with ID ${id}`,
      data: deletedInventoryItem,
    });
  } catch (error) {
    // Send the error response
    res.status(500).json({
      message: `Error deleting inventory item with ID ${id}`,
      error: error.message,
    });
  }
};

module.exports = {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
};
