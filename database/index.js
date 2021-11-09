const debug = require("debug")("robots:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const initializeDB = (databaseString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(databaseString, (error) => {
      if (error) {
        debug(chalk.red("Error al iniciar la base de datos"));
        debug(chalk.red(error.message));
        reject();
      } else {
        debug(chalk.green("Conexión a la base de datos exitosa"));
        resolve();
      }
    });
  });

module.exports = initializeDB;
