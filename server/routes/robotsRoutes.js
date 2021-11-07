const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  isAuthorized,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", isAuthorized, createRobot);

module.exports = router;
