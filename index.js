require("dotenv").config();
const initializeDB = require("./database");
const initializeServer = require("./server");

const port = process.env.SERVER_PORT;

(async () => {
  try {
    await initializeDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
