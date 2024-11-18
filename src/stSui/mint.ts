import { Transaction } from "@mysten/sui/transactions";
import { conf, CONF_ENV } from "../index.ts";

export async function mint(
  sui_amount: string,
  options: { address: string },
): Promise<Transaction | undefined> {
  const txb = new Transaction();

  const suiToStake = txb.splitCoins(txb.gas, [sui_amount]);

  const [sui] = txb.moveCall({
    target: conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::liquid_staking::mint",
    arguments: [
      txb.object(conf[CONF_ENV].LST_INFO),
      txb.object(conf[CONF_ENV].SUI_SYSTEM_STATE_OBJECT_ID),
      suiToStake,
    ],
    typeArguments: [conf[CONF_ENV].STSUI_COIN_TYPE],
  });
  txb.transferObjects([sui], options.address);
  return txb;
}
