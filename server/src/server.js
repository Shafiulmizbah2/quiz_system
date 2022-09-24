require("dotenv").config();

const http = require("http");
const app = require("./app");
const db = require("./db");

const port = process.env.PORT || 8000;

//connect database
db.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(`Con not connect to Database.${err}`));

//create server and listen
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
