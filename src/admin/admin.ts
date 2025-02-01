import { Transaction } from "@mysten/sui/transactions";
import {
  collect_fee,
  create_lst,
  LstParams,
  setValidators,
  updateFee,
} from "../index.js";
/**
 * Admin class has to be initialized to call admin functions specific to your lst.
 * @example
 *  const admin = new Admin({
    lstCointype:
      "0xabcd2358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd8abcd::demo::DEMO",
    treasuryCap:
      "0xabcdc88f4ac2eeeb5ac13917c4d3ce147228b62295d51dff4950abd3bb4cabcd",
  });
  const txb = await admin.createLst(
    0,
    1,
    600,
    10000,
    address,
  );
 */
export class Admin {
  lst: LstParams;
  constructor(lst: LstParams) {
    this.lst = lst;
  }
  /**
   *
   * @param mintFeeBps fee to be levied upon minting your lst
   * @param redeemFeeBps fee to be levied upon unstaking your lst
   * @param spreadFeeBps performance fee that can be charged by your lst on validator rewards
   * @param redistributionFeeBps percentage of redeem fee that will be redistributed among the stakers
   * @param address address where the admin cap and collection fee cap will be transferred
   * @returns transaction block
   */
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
  /**
   * note: collection fee cap is required to be set in {@link LstParams}
   * @param address address where the collected fee will be transferred
   * @returns transaction block
   */
  async collectFee(address: string): Promise<Transaction | undefined> {
    try {
      if (
        this.lst.lstInfo &&
        this.lst.collectionFeeCap &&
        this.lst.lstCointype
      ) {
        return await collect_fee(
          this.lst.lstInfo,
          this.lst.lstCointype,
          this.lst.collectionFeeCap,
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
  /**
   *
   * refer {@link createLst} for info on params
   * @returns transaction block
   */
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
  /**
   *
   * @param addresses list of validator addresses
   * @param weights list of weights corresponding to the i'th validator address
   * @returns transaction block
   */
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
