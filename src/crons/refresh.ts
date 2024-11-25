import { Transaction } from "@mysten/sui/transactions";
import { conf, CONF_ENV } from "../index.js";

export async function refresh(): Promise<Transaction | undefined> {
  const txb = new Transaction();
  txb.moveCall({
    target:
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::liquid_staking::refresh",
    arguments: [
      txb.object(conf[CONF_ENV].LST_INFO),
      txb.object(conf[CONF_ENV].SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [conf[CONF_ENV].STSUI_COIN_TYPE],
  });
  return txb;
}
