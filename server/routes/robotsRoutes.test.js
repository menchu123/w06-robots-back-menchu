require("dotenv").config();
const debug = require("debug")("robots:routes:tests");
const chalk = require("chalk");
const { response } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const initializeDB = require("../../database");
const { initializeServer } = require("../index");
const { app } = require("../index");

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  await initializeDB(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  const loginResponse = await request
    .post("/users/login")
    .send({ username: "maribot", password: "juanymedio11" })
    .expect(200);
  token = loginResponse.body.token;
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

describe("Given a /robots router,", () => {
  describe("When it gets a GET request for /robots", () => {
    test("Then it should send a response with an array of robots and a status code of 200", async () => {
      await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });
});
