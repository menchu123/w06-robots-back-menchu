const Robot = require("../../database/models/robots");
const { getRobots, getRobotById, createRobot } = require("./robotsControllers");

jest.mock("../../database/models/robots");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json and call the Robot.find function", async () => {
      const robots = [
        {
          id: 1,
          name: "Arturito",
        },
        {
          id: 2,
          name: "José Carlos",
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotById function", () => {
  describe("When it receives a request with an id 1, a response and a next function", () => {
    test("Then it should call the Robot.findById with a 1", async () => {
      const idRobot = 1;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Robot.findById = jest.fn().mockResolvedValue({});

      await getRobotById(req, res, next);
      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });
  describe("And Robot.findById rejects", () => {
    test("Then it should call next with an error", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("And Robot.findById returns undefined", () => {
    test("Then it should call next with an error", async () => {
      const error = new Error("Robot not found");
      Robot.findById = jest.fn().mockResolvedValue(undefined);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createRobot function", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the method json of res and call the Robot.create function", async () => {
      const robot = {
        id: 1,
        name: "Arturito",
      };

      const req = {
        body: robot,
      };

      Robot.create = jest.fn().mockResolvedValue(robot);
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await createRobot(req, res, next);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });

  describe("When it receives an object res and an invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};

      Robot.create = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
