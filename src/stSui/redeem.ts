import {
  Transaction,
  TransactionObjectArgument,
} from "@mysten/sui/transactions";
import { getConf, getSuiClient, stSuiExchangeRate } from "../index.js";
import { CoinStruct } from "@mysten/sui/client";
import { Decimal } from "decimal.js";

export async function redeem(
  stSuiAmount: string,
  options: { address: string },
): Promise<Transaction> {
  const txb = new Transaction();

  let coins: CoinStruct[] = [];

  let currentCursor: string | null | undefined = null;

  do {
    const response = await getSuiClient().getCoins({
      owner: options.address,
      coinType: getConf().STSUI_COIN_TYPE,
      cursor: currentCursor,
    });

    coins = coins.concat(response.data);

    // Check if there's a next page
    if (response.hasNextPage && response.nextCursor) {
      currentCursor = response.nextCursor;
    } else {
      // No more pages available
      // console.log("No more receipts available.");
      break;
    }
  } while (
    //eslint-disable-next-line no-constant-condition
    true
  );

  if (coins.length == 0) {
    throw new Error("No coin");
  }
  const [coin] = txb.splitCoins(txb.object(coins[0].coinObjectId), [0]);
  txb.mergeCoins(
    coin,
    coins.map((c) => c.coinObjectId),
  );
  const [stSuiCoin] = txb.splitCoins(coin, [stSuiAmount]);

  const [sui] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::redeem",
    arguments: [
      txb.object(getConf().LST_INFO),
      stSuiCoin,
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  txb.transferObjects([sui, coin], options.address);
  return txb;
}

export async function redeemTx(
  stSuiAmount: string,
  txb: Transaction | undefined = undefined,
  options: { address: string },
): Promise<{
  tx: Transaction;
  coinOut: TransactionObjectArgument | undefined;
  amountOut: string;
}> {
  if (!txb) txb = new Transaction();

  let coins: CoinStruct[] = [];

  let currentCursor: string | null | undefined = null;

  do {
    const response = await getSuiClient().getCoins({
      owner: options.address,
      coinType: getConf().STSUI_COIN_TYPE,
      cursor: currentCursor,
    });

    coins = coins.concat(response.data);

    // Check if there's a next page
    if (response.hasNextPage && response.nextCursor) {
      currentCursor = response.nextCursor;
    } else {
      // No more pages available
      // console.log("No more receipts available.");
      break;
    }
  } while (
    //eslint-disable-next-line no-constant-condition
    true
  );

  if (coins.length == 0) {
    throw new Error("No coin");
  }
  const [coin] = txb.splitCoins(txb.object(coins[0].coinObjectId), [0]);
  txb.mergeCoins(
    coin,
    coins.map((c) => c.coinObjectId),
  );
  const [stSuiCoin] = txb.splitCoins(coin, [stSuiAmount]);

  const [sui] = txb.moveCall({
    target: getConf().STSUI_LATEST_PACKAGE_ID + "::liquid_staking::redeem",
    arguments: [
      txb.object(getConf().LST_INFO),
      stSuiCoin,
      txb.object(getConf().SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [getConf().STSUI_COIN_TYPE],
  });
  txb.transferObjects([coin], options.address);

  const exchangeRate = new Decimal(await stSuiExchangeRate());
  const amount_decimal = new Decimal(stSuiAmount);
  const amountOut = amount_decimal.mul(exchangeRate);
  return {
    tx: txb,
    coinOut: sui,
    amountOut: amountOut.toString(),
  };
}
