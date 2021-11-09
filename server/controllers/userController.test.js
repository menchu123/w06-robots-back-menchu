require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/users");
const userLogin = require("./userController");

jest.mock("../../database/models/users");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given an userLogin function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Pablo";

      const req = {
        body: {
          username: usernameTest,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(false);
      const error = new Error("New phone who dis");
      error.code = 401;
      const next = jest.fn();

      await userLogin(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with an correct username and an incorrect password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const req = {
        body: {
          username: "Luis",
          password: "Wrong password",
        },
      };
      const res = {};
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "Luis",
        password: "Marta",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new Error("Eeeeeek Wrong password");
      error.code = 401;

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with an correct username and password", () => {
    test("Then it should invoke res.json with an object with a token", async () => {
      const req = {
        body: {
          username: "Luis",
          password: "Marta",
        },
      };
      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue({
        username: "Luis",
        password: "Marta",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedtoken = "lol";
      jwt.sign = jest.fn().mockReturnValue(expectedtoken);

      const error = new Error("Eeeeeek Wrong password");
      error.code = 401;
      const expectedResponse = {
        token: expectedtoken,
      };

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
