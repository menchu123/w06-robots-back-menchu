const debug = require("debug")("robots:controller");
const chalk = require("chalk");
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
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad Request!";
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    debug(chalk.cyanBright("Posting"));
    const newRobot = await Robot.create(req.body);
    res.json(newRobot);
  } catch (error) {
    debug(chalk.red("Post failed"));
    error.message = "Post failed";
    error.code = 400;
    next(error);
  }
};

module.exports = { getRobots, getRobotById, createRobot };
