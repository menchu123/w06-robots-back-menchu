const express = require("express");
const getRobots = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

module.exports = router;
