const debug = require("debug");
const Robot = require("../../database/models/robots");

const getRobots = async (req, res) => {
  debug("Loading robots");
  const robots = await Robot.find();
  res.json(robots);
};

module.exports = getRobots;
