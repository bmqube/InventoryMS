const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// cors configurations
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// connect to database
connectDB();

// base routes
app.use("/inventory", require("./routes/inventoryRoutes"));

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
