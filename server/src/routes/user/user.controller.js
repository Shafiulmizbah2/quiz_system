const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { generateToken } = require("../../utils/authService");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email & password are there
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "email is a required field!",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: "failed",
        message: "password is a required field!",
      });
    }
    //check if the user already exist
    const isUserAvailable = await User.findOne({ where: { email } });

    if (isUserAvailable) {
      return res.status(409).json({
        status: "falied",
        message: "This email is already registered!Please login to continue.",
      });
    }
    //if no user found then create new one.

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPass,
    });

    console.log(newUser);
    return res.status(201).json({
      status: "success",
      message: "User Registered successfully.Please login to continue.",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email & password are there
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "email is a required field!",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: "failed",
        message: "password is a required field!",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(401).json({
        status: "failed",
        message: "You are not registered.",
      });
    }

    const isPassSame = await bcrypt.compare(password, existingUser.password);

    if (!isPassSame) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid Email or Password!",
      });
    }

    const loggedinUserDetails = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    const accessToken = generateToken(loggedinUserDetails);

    return res.status(200).json({
      status: "success",
      accessToken,
      data: loggedinUserDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });

    return res.status(200).json({
      satus: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      satus: "failed",
      message: error,
    });
  }
};

module.exports = {
  registerUser,
  login,
  getAllUsers,
};
