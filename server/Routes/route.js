const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(cors());

router.post("/location", async (req, res) => {
  // const { startCity, endCity } = req.body;
  console.log("Location data received:", req.body);
  res.send("Location data received successfully");
});
