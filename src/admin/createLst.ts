import { Transaction } from "@mysten/sui/transactions";
import { conf, CONF_ENV } from "../index.ts";

export async function create_lst(
  treasuryCap: string,
  lstCoinType: string,
  mintFeeBps: number,
  redeemFeeBps: number,
  spreadFeeBps: number,
  options: { address: string },
) {
  const txb = new Transaction();

  let [config_b] = txb.moveCall({
    target: conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::fees::new_builder",
  });

  [config_b] = txb.moveCall({
    target:
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::fees::set_sui_mint_fee_bps",
    arguments: [config_b, txb.pure.u64(mintFeeBps)],
  });

  [config_b] = txb.moveCall({
    target:
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::fees::set_redeem_fee_bps",
    arguments: [config_b, txb.pure.u64(redeemFeeBps)],
  });

  [config_b] = txb.moveCall({
    target:
      conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::fees::set_spread_fee_bps",
    arguments: [config_b, txb.pure.u64(spreadFeeBps)],
  });

  const [fee_config] = txb.moveCall({
    target: conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID + "::fees::to_fee_config",
    arguments: [config_b],
  });

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
