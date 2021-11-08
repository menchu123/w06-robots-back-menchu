const express = require("express");
const auth = require("../middlewares/userMiddlewares/auth");
const {
  getRobots,
  getRobotById,
  createRobot,
  deleteRobot,
  updateRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", auth, getRobots);

router.get("/:idRobot", auth, getRobotById);

router.post("/create", auth, createRobot);

router.delete("/delete/:idRobot", auth, deleteRobot);

router.put("/update", auth, updateRobot);

module.exports = router;
