const Robot = require("../../database/models/robots");
const { getRobots } = require("./robotsControllers");

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
