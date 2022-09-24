const express = require("express");
const UserRouter = express.Router();

const {
  registerUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../../routes/user/user.controller");
const { authenticateToken, isPermited } = require("../../utils/authService");

//public route
UserRouter.post("/signup", registerUser);

UserRouter.get("/login", login);

//protected route
UserRouter.get("/users", authenticateToken, isPermited, getAllUsers);

UserRouter.get("/users/:id", authenticateToken, isPermited, getUser);

UserRouter.delete("/users/:id", authenticateToken, isPermited, deleteUser);

UserRouter.patch("/users/:id", authenticateToken, isPermited, updateUser);

module.exports = UserRouter;
