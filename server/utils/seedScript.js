const Inventory = require("../models/Inventory");
const listOfInventoryItems = [
  {
    name: "First Item",
    description: "This is the first item",
    cost: 10,
    quantity: 10,
  },
  {
    name: "Second Item",
    description: "This is the second item",
    cost: 20,
    quantity: 5,
  },
  {
    name: "Third Item",
    description: "This is the third item",
    cost: 30,
    quantity: 20,
  },
  {
    name: "Fourth Item",
    description: "This is the fourth item",
    cost: 40,
    quantity: 1,
  },
  {
    name: "Fifth Item",
    description: "This is the fifth item",
    cost: 50,
    quantity: 15,
  },
  {
    name: "Sixth Item",
    description: "This is the sixth item",
    cost: 60,
    quantity: 20,
  },
  {
    name: "Seventh Item",
    description: "This is the seventh item",
    cost: 70,
    quantity: 7,
  },
  {
    name: "Eighth Item",
    description: "This is the eighth item",
    cost: 80,
    quantity: 8,
  },
  {
    name: "Ninth Item",
    description: "This is the ninth item",
    cost: 90,
    quantity: 9,
  },
  {
    name: "Tenth Item",
    description: "This is the tenth item",
    cost: 100,
    quantity: 10,
  },
];

const seedData = async () => {
  try {
    let inventoryItems = await Inventory.find({});
    if (inventoryItems.length == 0) {
      await Inventory.insertMany(listOfInventoryItems);
      console.log("Database seeded!");
    }
  } catch (err) {
    console.log("Something went wrong!");
    console.log(err);
  }
};

module.exports = seedData;
