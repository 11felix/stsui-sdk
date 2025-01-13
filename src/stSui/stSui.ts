import { Transaction } from "@mysten/sui/transactions";
import { LstParams, mint, redeem, refresh } from "../index.js";

export class LST {
  lst: LstParams;

  constructor(lst: LstParams) {
    this.lst = lst;
  }

  async mint(
    suiAmount: string,
    address: string,
  ): Promise<Transaction | undefined> {
    try {
      if (this.lst.lstInfo && this.lst.lstCointype) {
        return await mint(
          this.lst.lstInfo,
          this.lst.lstCointype,
          suiAmount,
          address,
        );
      } else {
        throw new Error(
          "lst info object and cointype is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async redeem(
    stSuiAmount: string,
    address: string,
  ): Promise<Transaction | undefined> {
    try {
      if (this.lst.lstInfo && this.lst.lstCointype) {
        return await redeem(
          this.lst.lstInfo,
          this.lst.lstCointype,
          stSuiAmount,
          address,
        );
      } else {
        throw new Error(
          "lst info object and cointype is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async refresh(): Promise<Transaction | undefined> {
    try {
      if (this.lst.lstInfo && this.lst.lstCointype) {
        return await refresh(this.lst.lstInfo, this.lst.lstCointype);
      } else {
        throw new Error(
          "lst info object and cointype is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}
