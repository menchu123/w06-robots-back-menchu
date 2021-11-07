const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  isAuthorized,
  deleteRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", isAuthorized, createRobot);

router.post("/delete/:idRobot", isAuthorized, deleteRobot);

module.exports = router;
