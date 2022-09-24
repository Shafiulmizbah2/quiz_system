const Sequelize = require("sequelize");

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB;
const dbPort = process.env.DB_PORT;

const db = new Sequelize(dbName, user, password, {
  host,
  port: dbPort,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

module.exports = db;
