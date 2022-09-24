const express = require("express");
const UserRouter = express.Router();

const {
  registerUser,
  login,
  getAllUsers,
} = require("../../routes/user/user.controller");
const { authenticateToken, isPermited } = require("../../utils/authService");

//public route
UserRouter.post("/signup", registerUser);
UserRouter.get("/login", login);

//protected route
UserRouter.get("/users", authenticateToken, isPermited, getAllUsers);

module.exports = UserRouter;
