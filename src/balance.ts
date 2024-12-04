import { coins } from "./coin/constants.js";
import { getSuiClient } from "./common/client.js";

export async function getBalances(
  owner: string,
  tokenNames: string[],
): Promise<{ tokenName: string; balance: string }[]> {
  const suiClient = getSuiClient();

  const allBalances = await suiClient.getAllBalances({
    owner: owner,
  });
  const selectedCoins = Object.values(coins).filter((coin) =>
    tokenNames.includes(coin.name),
  );

  const coinTypes = selectedCoins.map((coin) => coin.type) as string[];

  const balances = allBalances
    .filter((balance) => coinTypes.includes(balance.coinType))
    .map((balance) => {
      const coin = selectedCoins.find((coin) => coin.type === balance.coinType);
      return {
        tokenName: coin ? coin.name : "Unknown",
        balance: balance.totalBalance,
      };
    });

  return balances;
}

export async function getAllBalances(
  owner: string,
): Promise<{ tokenName: string; balance: string }[]> {
  const suiClient = getSuiClient();

  const allBalances = await suiClient.getAllBalances({ owner });

  const balances = allBalances.map((balance) => {
    const coin = Object.values(coins).find(
      (coin) => coin.type.toLowerCase() === balance.coinType.toLowerCase(),
    );
    return {
      tokenName: coin ? coin.name : "Unknown",
      balance: balance.totalBalance,
    };
  });

  return balances;
}
