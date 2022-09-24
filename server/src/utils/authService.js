const jwt = require("jsonwebtoken");

const SECRET = process.env.ACCESS_SECRET;

const generateToken = (user) => {
  return jwt.sign(user, SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authorized!", error });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "You don't have permission!", error });
    req.user = user;
    next();
  });
};

const isPermited = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You don't have permission!", error });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "You don't have permission!", error });
  }
};

module.exports = {
  authenticateToken,
  generateToken,
  isPermited,
};
