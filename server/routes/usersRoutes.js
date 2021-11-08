const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../database/models/users");

const router = express.Router();

router.get("/", async () => {
  User.create({
    name: "María",
    username: "maribot",
    password: await bcrypt.hash("juanymedio11", 10),
  });
});

module.exports = router;
