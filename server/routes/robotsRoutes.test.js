require("dotenv").config();
const debug = require("debug")("robots:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");
const supertest = require("supertest");
const initializeDB = require("../../database");
const Robot = require("../../database/models/robots");
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
  await Robot.deleteMany();
  await Robot.create({
    _id: "618abb613c10e9728eef559a",
    __v: 0,
    nombre: "María Robotito",
    imagen: "ejemplito.jpg",
    características: {
      velocidad: 10,
      resistencia: 1,
      creación: "3080",
    },
  });
  await Robot.create({
    _id: "618abb613c10e9728eef559c",
    __v: 0,
    nombre: "María Robotazo",
    imagen: "ejemplazo.jpg",
    características: {
      velocidad: 1,
      resistencia: 10,
      creación: "0080",
    },
  });
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
      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const expectedLength = 2;
      const expectedRobot1 = {
        _id: "618abb613c10e9728eef559a",
        __v: 0,
        nombre: "María Robotito",
        imagen: "ejemplito.jpg",
        características: {
          velocidad: 10,
          resistencia: 1,
          creación: "3080",
        },
      };
      const expectedRobot2 = {
        _id: "618abb613c10e9728eef559c",
        __v: 0,
        nombre: "María Robotazo",
        imagen: "ejemplazo.jpg",
        características: {
          velocidad: 1,
          resistencia: 10,
          creación: "0080",
        },
      };
      expect(body).toHaveLength(expectedLength);
      expect(body).toContainEqual(expectedRobot1);
      expect(body).toContainEqual(expectedRobot2);
    });
  });

  describe("When it gets a GET request for /robots/:id with an existing id", () => {
    test("Then it should send a response the corresponding robot a status code of 200", async () => {
      const { body } = await request
        .get("/robots/618abb613c10e9728eef559a")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const expectedRobot = {
        _id: "618abb613c10e9728eef559a",
        __v: 0,
        nombre: "María Robotito",
        imagen: "ejemplito.jpg",
        características: {
          velocidad: 10,
          resistencia: 1,
          creación: "3080",
        },
      };

      expect(body).toEqual(expectedRobot);
    });
  });

  describe("When it gets a GET request for /robots/:id with an unknown id", () => {
    test("Then it should respond with a 'Robot not found' error", async () => {
      const { body } = await request
        .get("/robots/61855f4ba99aeba4d99148f5")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      const expectedError = {
        error: "Robot not found",
      };

      expect(body).toEqual(expectedError);
    });
  });

  describe("When it gets a POST request for /robots/create with a new robot object", () => {
    test("Then it should respond with a the new robot and a 200 status code", async () => {
      const { body } = await request
        .post("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          nombre: "María RobotAñadido",
          imagen: "añadido.jpg",
          características: {
            velocidad: 1,
            resistencia: 1,
            creación: "2001",
          },
        })
        .expect(200);

      expect(body).toHaveProperty("nombre", "María RobotAñadido");
    });
  });
});
