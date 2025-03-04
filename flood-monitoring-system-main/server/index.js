const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//

let distance = null;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/distance", (req, res) => {
  console.log("Data received:", req.body);
  distance = req.body.distance; // update the distance value
  res.status(200).json({ message: "Data received successfully" });
});

app.get("/distance", (req, res) => {
  if (distance === null) {
    res.status(404).json({ error: "No distance data available" });
  } else {
    res.json({ distance: distance });
  }
});

app.get("/data", (req, res) => {
  res.json({
    data: [
      { sensor: "Sensor 1", value: 25 },
      { sensor: "Sensor 2", value: 30 },
      { sensor: "Sensor 3", value: 28 },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
