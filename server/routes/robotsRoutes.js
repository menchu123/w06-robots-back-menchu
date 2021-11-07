const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  isAuthorized,
  deleteRobot,
  updateRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", isAuthorized, createRobot);

router.delete("/delete/:idRobot", isAuthorized, deleteRobot);

router.put("/update", isAuthorized, updateRobot);

module.exports = router;
