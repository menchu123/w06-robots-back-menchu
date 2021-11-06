const Robot = require("../../database/models/robots");
const { getRobots, getRobotById } = require("./robotsControllers");

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
});
