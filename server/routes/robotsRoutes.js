const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

module.exports = router;
