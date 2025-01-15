import {
  FeeConfig,
  fetchTotalSuiStaked,
  getFees,
  getLstInfo,
  LiquidStakingInfo,
  LstParams,
  stStuiCirculationSupply,
  stSuiExchangeRate,
} from "../index.js";

export class Utils {
  lst: LstParams;
  constructor(lst: LstParams) {
    this.lst = lst;
  }
  async lstExchangeRate(ignoreCache: boolean): Promise<string | undefined> {
    try {
      if (this.lst.lstInfo) {
        return await stSuiExchangeRate(this.lst.lstInfo, ignoreCache);
      } else {
        throw new Error("lst info object is required for this operation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getLstInfo(
    ignoreCache: boolean,
  ): Promise<LiquidStakingInfo | undefined> {
    try {
      if (this.lst.lstInfo) {
        return await getLstInfo(this.lst.lstInfo, ignoreCache);
      } else {
        throw new Error("lst info object is required for this operation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async lstCirculationSupply(
    ignoreCache: boolean,
  ): Promise<string | undefined> {
    try {
      if (this.lst.lstInfo) {
        return await stStuiCirculationSupply(this.lst.lstInfo, ignoreCache);
      } else {
        throw new Error("lst info object is required for this operation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchTotalSuiStaked(ignoreCache: boolean): Promise<string | undefined> {
    try {
      if (this.lst.lstInfo) {
        return await fetchTotalSuiStaked(this.lst.lstInfo, ignoreCache);
      } else {
        throw new Error("lst info object is required for this operation");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getFees(ignoreCache: boolean): Promise<FeeConfig | undefined> {
    try {
      if (this.lst.lstInfo) {
        return await getFees(this.lst.lstInfo, ignoreCache);
      } else {
        throw new Error("lst info object is required for this operation");
      }
    } catch (e) {
      console.error(e);
    }
  }
}
