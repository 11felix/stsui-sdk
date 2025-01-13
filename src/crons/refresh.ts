import { Transaction } from "@mysten/sui/transactions";
import { getConf } from "../index.js";

export async function refresh(
  lstInfo: string,
  lstCoinType: string,
): Promise<Transaction | undefined> {
  const txb = new Transaction();
  txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::refresh",
    arguments: [
      txb.object(lstInfo),
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [lstCoinType],
  });
  return txb;
}
