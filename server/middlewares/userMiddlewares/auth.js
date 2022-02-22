const debug = require("debug")("robots:controller");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.redBright("Lo siento pero es que no sé quién eres"));
    const error = new Error("Lo siento pero es que no sé quién eres");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      debug(chalk.redBright("Lo siento pero es que no sé quién eres 2"));
      const error = new Error("Lo siento pero es que no sé quién eres 2");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message = "El token está mal sorrynotsorry :/";
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
