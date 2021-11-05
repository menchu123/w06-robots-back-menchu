const express = require("express");
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const morgan = require("morgan");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.green(`Escuchanddo en ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("No se ha podido iniciar el servidor :("));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`${port} está en uso`));
    }
  });
};

app.use(morgan("dev"));

module.exports = initializeServer;
