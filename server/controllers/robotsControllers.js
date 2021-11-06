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
    debugger;
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad Request!";
    next(error);
  }
};

const createRobot = async (req, res) => {
  const newRobot = await Robot.create(req.body);
  res.json(newRobot);
};

module.exports = { getRobots, getRobotById, createRobot };
