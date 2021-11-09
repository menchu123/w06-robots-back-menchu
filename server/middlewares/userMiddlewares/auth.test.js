const auth = require("./auth");

describe("Given an auth middleware,", () => {
  describe("When it gets a request without an Authorization header", () => {
    test("Then it should call next with a 'Lo siento pero es que no sé quién eres' error and a status code of 401", () => {
      const req = {
        header: jest.fn(),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error("Lo siento pero es que no sé quién eres");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it gets a request with an Authorization header but no token", () => {
    test("Then it should call next with a 'Lo siento pero es que no sé quién eres 2' error and a status code of 401", () => {
      const authHeader = "hola";
      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error(
        "Lo siento pero es que no sé quién eres 2"
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe.skip("When it gets a request with an Authorization header and a token but it is incorrect", () => {
    test("Then it should call next with a 'El token está mal sorrynotsorry :/'' error and a status code of 401", async () => {
      const authHeader = "hola peix";
      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const res = {};
      const next = jest.fn();

      const error = new Error("El token está mal sorrynotsorry :/");

      error.message = jest.fn();

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
