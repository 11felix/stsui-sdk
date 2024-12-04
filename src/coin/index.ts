import { Coin } from "./types.js";
import { PaginatedCoins } from "@mysten/sui/client";
import { getSuiClient } from "../common/client.js";

export * from "./types.js";

const suiClient = getSuiClient();

export async function getWalletCoins(owner: string): Promise<Coin[]> {
  const coins: Coin[] = [];
  let currentCursor: string | null | undefined = null;
  const coinTypes: string[] = [];

  while (true) {
    const paginatedCoins: PaginatedCoins = await suiClient.getAllCoins({
      owner: owner,
      cursor: currentCursor,
    });

    // Traverse the current page data and push to coins array
    paginatedCoins.data.forEach((coin) => {
      console.log(`Coin Name: ${coin.coinType}, Coin Value: ${coin.balance}`);
      coinTypes.push(coin.coinType);
    });

    // Check if there's a next page
    if (paginatedCoins.hasNextPage && paginatedCoins.nextCursor) {
      currentCursor = paginatedCoins.nextCursor;
    } else {
      // No more pages available
      console.log("No more coins available.");
      break;
    }
  }

  return coins;
}
