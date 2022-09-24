const express = require("express");
const cors = require("cors");
const app = express();

const UserRouter = require("./routes/user/user.route");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//Routes
app.use(UserRouter);

module.exports = app;
