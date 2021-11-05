const initializeDB = require("./database");
const initializeServer = require("./server");

require("dotenv").config();

const port = process.env.SERVER_PORT;

(async () => {
  try {
    await initializeDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
