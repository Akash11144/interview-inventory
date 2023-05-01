const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const inventoryRoutes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use("/", inventoryRoutes);

app.listen(1234, () => {
  console.log("Server running on port 1234");
});
