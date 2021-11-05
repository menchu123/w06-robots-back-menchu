const express = require("express");
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./errors");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.green(`¡Escuchanddo en ${port}! ʕ•ᴥ•ʔﾉ♡`));
  });

  server.on("error", (error) => {
    debug(chalk.red("No se ha podido iniciar el servidor :("));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`${port} está en uso...  ʕʘ̅┏ل͜┓ʘ̅ʔ`));
    }
  });
};

app.use(morgan("dev"));

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
