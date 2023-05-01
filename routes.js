const inventoryModel = require("./schema");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("inventory routes...");
  res.send("inventory routes...");
});

router.post("/create-inventory", async (req, res) => {
  console.log("create-inventory...");
  const { data } = req.body;
  console.log("data: ", data);
  const result = await inventoryModel.insertMany(data);
  res.send({ message: "create-inventory...", output: result });
});

router.put("/update-inventory-quantity", async (req, res) => {
  console.log("update-inventory-quantity...");
  const { data } = req.body;
  console.log("data: ", data);
  const output = [];
  for (let i = 0; i < data.length; i++) {
    const { productId, quantity, operation } = data[i];
    console.log("productId: ", productId);
    console.log("quantity: ", quantity);
    console.log("operation: ", operation);
    if (operation === "add") {
      const r = await inventoryModel.findOneAndUpdate(
        { productId },
        { $inc: { quantity } },
        { new: true }
      );
      output.push(r);
    } else if (operation === "subtract") {
      const r1 = await inventoryModel.findOneAndUpdate(
        { productId },
        { $inc: { quantity: -quantity } },
        { new: true }
      );
      output.push(r1);
    }
  }
  res.send({ message: "update-inventory-quantity...", output });
});

module.exports = router;
