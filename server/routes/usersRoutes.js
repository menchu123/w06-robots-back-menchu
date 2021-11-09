const express = require("express");
const userLogin = require("../controllers/userController");
const loginRequestSchema = require("../schemas/userSchemas");
const { validate } = require("../schemas/userSchemas");

const router = express.Router();

router.post("/login", validate(loginRequestSchema), userLogin);

module.exports = router;
