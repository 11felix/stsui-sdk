import { fetchStSuiAPR } from "..";

describe("fetchStSuiAPR", () => {
  it("should return the correct value", async () => {
    return fetchStSuiAPR(1).then((apr) => {
      expect(apr).toBeDefined();
    });
  });
});

describe("getAprs", () => {
  it("should return the correct value", async () => {
    return fetchStSuiAPR(365).then((apr) => {
      expect(apr).toBeDefined();
    });
  });
});
