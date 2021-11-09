require("dotenv").config();
const debug = require("debug")("robots:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");
const supertest = require("supertest");
const initializeDB = require("../../database");
const app = require("../index");

const request = supertest(app);

let server;

beforeAll(async () => {
  await initializeDB(process.env.MONGODB_STRING_TEST);
  server = await app.initializeServer(process.env.SERVER_PORT_TEST);
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connexion to database ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connexion to server ended"));
  });
  await server.close();
});

describe("", () => {
  describe("", () => {
    test("", () => {});
  });
});
