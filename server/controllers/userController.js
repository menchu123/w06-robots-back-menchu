require("dotenv").config();
const debug = require("debug")("robots:controller");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/users");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.redBright("New phone who dis"));
    const error = new Error("New phone who dis");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.redBright("Eeeeeek Wrong password"));
      const error = new Error("Eeeeeek Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

module.exports = userLogin;
