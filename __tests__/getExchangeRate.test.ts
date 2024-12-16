import { stSuiExchangeRate } from "..";

describe("stSuiExchangeRate", () => {
  it("should return the correct value", async () => {
    return stSuiExchangeRate().then((exchangeRate) => {
      expect(exchangeRate).toBeDefined();
    });
  });
});
