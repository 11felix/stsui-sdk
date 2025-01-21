import { Transaction } from "@mysten/sui/transactions";
import { LstParams, mint, redeem, refresh } from "../index.js";

/**
 * LST class has to be initialized to call key lst functions like mint, redeem and refresh.
 * @example
 *  const lst = new LST({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7eabcde",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2ddabcse::demo::DEMO",
  });
  * const txb = await lst.mint("100000000", address);
 */
export class LST {
  lst: LstParams;

  constructor(lst: LstParams) {
    this.lst = lst;
  }
  /**
   * @param suiAmount amount of sui to stake
   * @param address address where the minted stsui will be transferred.
   * @returns transaction block
   */
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

  /**
   *
   * @param stSuiAmount amount of stsui to unstake
   * @param address address where the redemmed sui will be transferred.
   * @returns transaction block
   */
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

  /**
   * Multipurpose onchain function that ideally has to be called right before and after change of epoch.
   * Used to stake all the pending sui to the updated set of validators and convert all the staked sui to fungible sui when eligible.
   * @returns transaction block
   */
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
