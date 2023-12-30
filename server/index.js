import express from "express";
import cors from "cors";
import authMW from "./middlewares/authMW";
import connectDB from "./utils/db";

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
connectDB(process.env.MONGODB_URI);

// base routes
app.use("/inventory", authMW, require("./routes/inventoryRoutes"));

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
