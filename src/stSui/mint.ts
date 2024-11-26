import { Transaction } from "@mysten/sui/transactions";
import { getConf } from "../index.js";

export async function mint(
  sui_amount: string,
  options: { address: string },
): Promise<Transaction | undefined> {
  const txb = new Transaction();

  const suiToStake = txb.splitCoins(txb.gas, [sui_amount]);

  const [sui] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::mint",
    arguments: [
      txb.object(getConf().LST_INFO),
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
      suiToStake,
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  txb.transferObjects([sui], options.address);
  return txb;
}
