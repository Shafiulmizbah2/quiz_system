const express = require("express");
const cors = require("cors");
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

module.exports = app;
