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

const deleteRobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findByIdAndDelete(idRobot);
    if (searchedRobot) {
      res.json({ id: searchedRobot.id });
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

const updateRobot = async (req, res, next) => {
  try {
    debug(chalk.cyanBright("Putting"));
    const { _id } = req.body;
    const findRobot = Robot.findById(_id);
    if (findRobot === null) {
      const newRobot = await Robot.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      res.json(newRobot);
    } else {
      console.log(_id);
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    debug(chalk.red("PUT failed"));
    error.message = "PUT failed";
    error.code = 400;
    next(error);
  }
};

const isAuthorized = (req, res, next) => {
  const { token } = req.query;
  if (token === process.env.TOKEN) {
    next();
  } else {
    debug(chalk.red("Unauthorised"));
    res.status(401).json({ error: "Unauthorised" });
  }
};

module.exports = {
  getRobots,
  getRobotById,
  createRobot,
  deleteRobot,
  updateRobot,
  isAuthorized,
};
