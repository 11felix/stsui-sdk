import { Transaction } from "@mysten/sui/transactions";
import { getConf } from "../index.js";

export async function collect_fee(options: {
  address: string;
}): Promise<Transaction | undefined> {
  const txb = new Transaction();

  const [sui] = txb.moveCall({
    target:
      getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::collect_fees",
    arguments: [
      txb.object(getConf().LST_INFO),
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
      txb.object(getConf().COLLECTION_FEE_CAP_ID),
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  txb.transferObjects([sui], options.address);
  return txb;
}
export async function updateFees(
  mintFeeBps: number,
  redeemFeeBps: number,
  spreadFeeBps: number,
  redistributionFeeBps: number,
): Promise<Transaction | undefined> {
  const txb = new Transaction();
  const fee_config = createFeeConfig(
    mintFeeBps,
    redeemFeeBps,
    spreadFeeBps,
    redistributionFeeBps,
    txb,
  );
  txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::update_fees",
    arguments: [
      txb.object(getConf().LST_INFO),
      txb.object(getConf().ADMIN_CAP),
      fee_config,
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  return txb;
}

export function createFeeConfig(
  mintFeeBps: number,
  redeemFeeBps: number,
  spreadFeeBps: number,
  redistributionFeeBps: number,
  txb: Transaction,
): {
  $kind: "NestedResult";
  NestedResult: [number, number];
} {
  let [config_b] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::fees::new_builder",
  });

  [config_b] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::fees::set_sui_mint_fee_bps",
    arguments: [config_b, txb.pure.u64(mintFeeBps)],
  });

  [config_b] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::fees::set_redeem_fee_bps",
    arguments: [config_b, txb.pure.u64(redeemFeeBps)],
  });

  [config_b] = txb.moveCall({
    target:
      getConf().STSUI_LATEST_PACKAGE_ID +
      "::fees::set_redeem_fee_distribution_component_bps",
    arguments: [config_b, txb.pure.u64(redistributionFeeBps)],
  });

  [config_b] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::fees::set_spread_fee_bps",
    arguments: [config_b, txb.pure.u64(spreadFeeBps)],
  });

  const [fee_config] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::fees::to_fee_config",
    arguments: [config_b],
  });

  return fee_config;
}
