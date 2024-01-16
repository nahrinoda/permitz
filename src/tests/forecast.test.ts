import { getPermitForecast } from "../forecast/helpers";

describe("Permit Forecast", () => {
  it("throws because its not implemented", () => {
    expect(getPermitForecast([], new Date())).toThrow();
  });
});
