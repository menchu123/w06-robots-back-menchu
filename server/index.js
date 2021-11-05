const express = require("express");
const debug = require("debug")("robots:server");
const chalk = require("chalk");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.green(`Escuchanddo en ${port}`));
  });
};
