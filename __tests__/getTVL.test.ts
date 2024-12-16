import { stStuiCirculationSupply } from "..";

describe("fetchStSuiAPR", () => {
  it("should return the correct value", async () => {
    return stStuiCirculationSupply().then((tvl) => {
      expect(tvl).toBeDefined();
    });
  });
});
