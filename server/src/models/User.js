const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

(async () => {
  await db.sync();
})();

module.exports = User;
