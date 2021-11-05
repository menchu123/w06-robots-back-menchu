const initializeServer = require("./server");

require("dotenv").config();

const port = process.env.SERVER_PORT;
initializeServer(port);
