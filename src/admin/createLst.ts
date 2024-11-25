import { Transaction } from "@mysten/sui/transactions";
import { conf, CONF_ENV, createFeeConfig } from "../index.ts";

export async function create_lst(
  treasuryCap: string,
  lstCoinType: string,
  mintFeeBps: number,
  redeemFeeBps: number,
  spreadFeeBps: number,
  redistributionFeeBps: number,
  options: { address: string },
) {
  const txb = new Transaction();

  const fee_config = createFeeConfig(
    mintFeeBps,
    redeemFeeBps,
    spreadFeeBps,
    redistributionFeeBps,
    txb,
  );

  const [admin_cap, collection_fee_cap, lst_info] = txb.moveCall({
    target:
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::liquid_staking::create_lst",
    arguments: [fee_config, txb.object(treasuryCap)],
    typeArguments: [lstCoinType],
  });

  txb.transferObjects([admin_cap, collection_fee_cap], options.address);

  txb.moveCall({
    target: "0x2::transfer::public_share_object",
    arguments: [lst_info],
    typeArguments: [
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID +
        "::liquid_staking::LiquidStakingInfo<" +
        lstCoinType +
        ">",
    ],
  });
  return txb;
}
