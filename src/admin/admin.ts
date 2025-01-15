import { Transaction } from "@mysten/sui/transactions";
import {
  collect_fee,
  create_lst,
  LstParams,
  setValidators,
  updateFee,
} from "../index.js";

export class Admin {
  lst: LstParams;
  constructor(lst: LstParams) {
    this.lst = lst;
  }
  async createLst(
    mintFeeBps: number,
    redeemFeeBps: number,
    spreadFeeBps: number,
    redistributionFeeBps: number,
    address: string,
  ): Promise<Transaction | undefined> {
    try {
      if (this.lst.treasuryCap && this.lst.lstCointype) {
        return await create_lst(
          this.lst.treasuryCap,
          this.lst.lstCointype,
          mintFeeBps,
          redeemFeeBps,
          spreadFeeBps,
          redistributionFeeBps,
          address,
        );
      } else {
        throw new Error(
          "treasury cap and lst coin type are required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async collectFee(address: string): Promise<Transaction | undefined> {
    try {
      if (
        this.lst.lstInfo &&
        this.lst.collectionFeeCap &&
        this.lst.lstCointype
      ) {
        return await collect_fee(
          this.lst.lstInfo,
          this.lst.collectionFeeCap,
          this.lst.lstCointype,
          address,
        );
      } else {
        throw new Error(
          "lst info object and collection fee cap is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async updateFee(
    mintFeeBps: number,
    redeemFeeBps: number,
    spreadFeeBps: number,
    redistributionFeeBps: number,
  ): Promise<Transaction | undefined> {
    try {
      if (this.lst.lstInfo && this.lst.adminCap && this.lst.lstCointype) {
        return await updateFee(
          this.lst.lstInfo,
          this.lst.adminCap,
          this.lst.lstCointype,
          mintFeeBps,
          redeemFeeBps,
          spreadFeeBps,
          redistributionFeeBps,
        );
      } else {
        throw new Error(
          "lst info object and admin cap is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async setValidators(
    addresses: string[],
    weights: number[],
  ): Promise<Transaction | undefined> {
    try {
      if (this.lst.lstInfo && this.lst.adminCap && this.lst.lstCointype) {
        return await setValidators(
          this.lst.lstInfo,
          this.lst.adminCap,
          this.lst.lstCointype,
          addresses,
          weights,
        );
      } else {
        throw new Error(
          "lst info object, admin cap and lst coin type is required for this operation",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}
