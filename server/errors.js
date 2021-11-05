const debug = require("debug")("robots:errors");
const chalk = require("chalk");

const notFoundErrorHandler = (req, res) => {
  debug(chalk.red("Not found (404)"));
  res.status(404).json({ error: "Endopoint not found (404)" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug(chalk.red(`Error: ${error.message}`));
  const message = error.code ? error.message : "General error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = { notFoundErrorHandler, generalErrorHandler };
