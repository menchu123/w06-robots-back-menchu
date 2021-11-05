const express = require("express");
const debug = require("debug");

const router = express.Router();

const Robot = require("../../database/models/robots");

router.get("/", async (req, res) => {
  debug("Loading robots");
  const robots = await Robot.find();
  res.json(robots);
});

module.exports = router;
