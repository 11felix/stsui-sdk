import { Transaction } from "@mysten/sui/transactions";
import { getConf } from "../index.js";

export async function refresh(): Promise<Transaction | undefined> {
  const txb = new Transaction();
  txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::refresh",
    arguments: [
      txb.object(getConf().LST_INFO),
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  return txb;
}
