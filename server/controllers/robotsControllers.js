const chalk = require("chalk");
const debug = require("debug");
const Robot = require("../../database/models/robots");

const getRobots = async (req, res) => {
  debug(chalk.yellowBright("Loading robots"));
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot);
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getRobots, getRobotById };
