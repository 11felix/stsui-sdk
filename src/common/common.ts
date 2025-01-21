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
/**
 * Utils class has to be initialized to call common utility functions.
 * @example
 *  const lstParams: LstParams = {
      lstInfo:
        "0xYourlstInfo",
      lstCointype:
        "0xabc72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b014abcde::lstcoin::LSTCOIN",
    };
    const utils = new Utils(lstParams);
  * const suiStaked = await utils.fetchTotalSuiStaked(false);
 */
export class Utils {
  lst: LstParams;
  constructor(lst: LstParams) {
    this.lst = lst;
  }
  /**
   *
   * @param ignoreCache set to true if no internal caching is desired
   * @returns returns ratio of sui to stsui
   */
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
  /**
   *
   * @param ignoreCache set to true if no internal caching is desired
   * @returns {@link LiquidStakingInfo}
   */
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
  /**
   *
   * @param ignoreCache set to true if no internal caching is desired
   * @returns amount of lst in circulation
   */
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
  /**
   *
   * @param ignoreCache set to true if no internal caching is desired
   * @returns total amount of sui staked against your lst
   */
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
  /**
   *
   * @param ignoreCache set to true if no internal caching is desired
   * @returns {@link FeeConfig} information on the fee setting of your lst
   */
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
