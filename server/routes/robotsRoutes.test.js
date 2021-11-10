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
  const loginResponse = await request
    .post("/users/login")
    .send({ username: "maribot", password: "juanymedio11" })
    .expect(200);
  token = loginResponse.body.token;
});

beforeEach(async () => {
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

  describe("When it gets a POST request for /robots/create with a new robot object that is not well formatted", () => {
    test("Then it should respond with a 'Post failed' error", async () => {
      const { body } = await request
        .post("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "María RobotAñadido",
          imagen: "añadido.jpg",
          velocidad: 1,
          resistencia: 1,
          creación: "2001",
        })
        .expect(400);

      const expectedError = {
        error: "Post failed",
      };

      expect(body).toEqual(expectedError);
    });
  });

  describe("When it gets a DELETE request for /robots/delete/:id with an existing id", () => {
    test("Then it should send a response with the id of the corresponding robot a status code of 200", async () => {
      const { body } = await request
        .delete("/robots/delete/618abb613c10e9728eef559a")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const deletedRobot = {
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

      // eslint-disable-next-line no-underscore-dangle
      expect(body).toEqual({ id: deletedRobot._id });
    });
  });

  describe("When it gets a DELETE request for /robots/delete/:id with an unknown id", () => {
    test("Then it should send a response with the id of the corresponding robot a status code of 404", async () => {
      const { body } = await request
        .delete("/robots/delete/61855f4ba99aeba4d99148f7")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      const expectedError = {
        error: "Robot not found",
      };

      expect(body).toEqual(expectedError);
    });
  });

  describe("When it gets a PUT request for /robots/update with an edited object with an existing id", () => {
    test("Then it should send a response with the updated robot a status code of 200", async () => {
      const { body } = await request
        .put("/robots/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          _id: "618abb613c10e9728eef559a",
          __v: 0,
          nombre: "María Robotito Updated",
          imagen: "ejemplito.jpg",
          características: {
            velocidad: 9,
            resistencia: 1,
            creación: "3080",
          },
        })
        .expect(200);

      expect(body).toHaveProperty("nombre", "María Robotito Updated");
    });
  });

  describe("When it gets a request for an unknown route", () => {
    test("Then it should return an error with a message 'Endopoint not found (404) （┬┬＿┬┬）' with a status code of 404", async () => {
      const { body } = await request.put("/robots/noexisto").expect(404);

      const expectedError = {
        error: "Endopoint not found (404) （┬┬＿┬┬）",
      };

      expect(body).toEqual(expectedError);
    });
  });
});
