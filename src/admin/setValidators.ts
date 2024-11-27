import { Transaction } from "@mysten/sui/transactions";
import { getConf } from "../index.js";

export async function set_validators(
  addresses: string[],
  weights: number[],
): Promise<Transaction | undefined> {
  if (addresses.length !== weights.length) {
    throw new Error("different lengths of addresses and weights");
  }
  const txb = new Transaction();

  const [vec_map] = txb.moveCall({
    target: "0x2::vec_map::empty",
    typeArguments: ["address", "u64"],
  });

  for (let i = 0; i < addresses.length; i++) {
    txb.moveCall({
      target: "0x2::vec_map::insert",
      arguments: [
        vec_map,
        txb.pure.address(addresses[i]),
        txb.pure.u64(weights[i]),
      ],
      typeArguments: ["address", "u64"],
    });
  }

  txb.moveCall({
    target:
      getConf().STSUI_LATEST_PACKAGE_ID +
      "::liquid_staking::set_validator_addresses_and_weights",
    arguments: [
      txb.object(getConf().LST_INFO),
      vec_map,
      txb.object(getConf().ADMIN_CAP),
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });

  return txb;
}
