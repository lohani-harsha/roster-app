const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const port = 3001;
const companies = require("./sample-data.json");

app.get("/", (req, res) => {
  res.send("Welcome to test app backend server");
});

app.get("/companies", (req, res) => {
  res.send(companies);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
