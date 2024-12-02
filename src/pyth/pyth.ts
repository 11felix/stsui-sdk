import { /*coinGeckoPriceFeed,*/ coinsToGetFromPyth } from "./constants.js";
import { PythPriceIdPair } from "./types.js";
import { SimpleCache } from "../common/simpleCache.js";
// import {
//   DynamoDBClient,
//   ScanCommand,
//   PutItemCommand,
//   GetItemCommand,
//   BatchGetItemCommand,
// } from "@aws-sdk/client-dynamodb";

export async function getMultiLatestPrices() {
  const pricesFromPyth = await getLatestPrices(coinsToGetFromPyth, true);
  pricesFromPyth.forEach((price, index) => {
    if (price) {
      const cacheKey = `getLatestPrice-${coinsToGetFromPyth[index]}`;
      latestPriceCache.set(cacheKey, price);
    }
  });
}

const latestPriceCache = new SimpleCache<string>(10000);
export async function getLatestPrices(
  pairs: PythPriceIdPair[],
  ignoreCache: boolean,
): Promise<string[]> {
  const pairsToFetch: PythPriceIdPair[] = [];
  const pairsToFetchIndexes: number[] = [];

  const prices: string[] = pairs.map((pair, index) => {
    const cacheKey = `getLatestPrice-${pair}`;
    if (ignoreCache) {
      latestPriceCache.delete(cacheKey);
    }
    const cachedResponse = latestPriceCache.get(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
    pairsToFetch.push(pair);
    pairsToFetchIndexes.push(index);
    return "";
  });
  if (pairsToFetch.length > 0) {
    try {
      const fetchedPrices = await fetchPricesFromAlphaAPI(pairsToFetch);
      pairsToFetch.forEach((_pair, i) => {
        const price = fetchedPrices[i];
        prices[pairsToFetchIndexes[i]] = price.price;
      });
    } catch (error) {
      console.error(
        `Error in getLatestPrices for pairs ${pairsToFetch}:`,
        error,
      );
    }
  }
  prices.forEach((price, i) => {
    if (price) {
      const cacheKey = `getLatestPrice-${pairs[i]}`;
      latestPriceCache.set(cacheKey, price);
    }
  });
  return prices;
}

export async function getLatestTokenPricePairs(
  pairs: PythPriceIdPair[],
  ignoreCache: boolean,
): Promise<{ [key: string]: string | undefined }> {
  const priceMap: { [key: string]: string | undefined } = {};

  // Use getLatestPrices to fetch all prices at once
  const prices = await getLatestPrices(pairs, ignoreCache);

  pairs.forEach((pair, index) => {
    priceMap[pair] = prices[index];
  });

  return priceMap;
}

interface PythPricePair {
  pair: PythPriceIdPair;
  price: string;
}

export async function fetchPricesFromAlphaAPI(
  pairs: PythPriceIdPair[],
): Promise<PythPricePair[]> {
  const req_url = `https://api.alphafi.xyz/alpha/fetchPrices?pairs=${pairs.join(",")}`;
  let prices: PythPricePair[] = [];
  try {
    const res = await fetch(req_url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = (await res.json()) as PythPricePair[];
    prices = data;
  } catch (error) {
    console.error(`Error fetching prices for pairs ${pairs}:`, error);
    throw error;
  }
  return prices;
}

// ------------------ common code to be used in api and cron -----------

// const dynamoDbClient = new DynamoDBClient({});
// const TABLE_NAME = process.env.CACHE_TABLE_NAME;
// interface Gecko {
//   [key: string]: {
//     usd: number;
//   };
// }
// export async function fetchPricesFromCoinGecko(
//   pairs: string[],
// ): Promise<string[]> {
//   const coinIds = pairs.map((pair) => coinGeckoPriceFeed[pair]?.coinId);
//   const coinGeckoApiKey = process.env.COIN_GECKO_API_KEY;
//   const prices: string[] = [];
//   if (coinGeckoApiKey) {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-pro-api-key": coinGeckoApiKey,
//       },
//     };
//     try {
//       const req_url = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd&precision=9`;
//       const res = await fetch(req_url, options);
//       if (!res.ok) {
//         throw new Error(
//           `HTTP error in fetchPricesFromCoinGecko! status: ${res.status}`,
//         );
//       }
//       const resJson: Gecko = (await res.json()) as Gecko;
//       coinIds.forEach((coinId) => {
//         prices.push(resJson[coinId].usd.toString());
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return prices;
// }

// export async function getCachedPairs(
//   pairs: string[],
// ): Promise<{ name: string; price: string; lastUpdated: number }[]> {
//   const keys = pairs.map((pair) => ({
//     pair: { S: pair },
//   }));

//   const params = {
//     RequestItems: {
//       [TABLE_NAME as string]: {
//         Keys: keys,
//       },
//     },
//   };

//   const result = await dynamoDbClient.send(new BatchGetItemCommand(params));
//   const resultItems = result.Responses?.[TABLE_NAME as string]
//     ? result.Responses[TABLE_NAME as string]
//         .map((item) => ({
//           name: item.pair?.S,
//           price: item.price?.S,
//           lastUpdated: item.lastUpdated?.N
//             ? parseInt(item.lastUpdated.N, 10)
//             : undefined,
//         }))
//         .filter(
//           (
//             item,
//           ): item is { name: string; price: string; lastUpdated: number } =>
//             item.name !== undefined &&
//             item.price !== undefined &&
//             item.lastUpdated !== undefined,
//         )
//     : [];

//   return resultItems;
// }

// export async function getAllCachedPairs(): Promise<
//   { name: string; price: string; lastUpdated: number }[]
// > {
//   const params = {
//     TableName: TABLE_NAME,
//   };

//   const result = await dynamoDbClient.send(new ScanCommand(params));
//   const resultItems = result.Items
//     ? result.Items.map((item) => ({
//         name: item.pair?.S,
//         price: item.price?.S,
//         lastUpdated: item.lastUpdated?.N
//           ? parseInt(item.lastUpdated.N, 10)
//           : undefined,
//       })).filter(
//         (item): item is { name: string; price: string; lastUpdated: number } =>
//           item.name !== undefined &&
//           item.price !== undefined &&
//           item.lastUpdated !== undefined,
//       )
//     : [];

//   return resultItems;
// }

// export async function getCachedPair(
//   pair: string,
// ): Promise<{ name: string; price: string; lastUpdated: number } | undefined> {
//   const params = {
//     TableName: TABLE_NAME,
//     Key: {
//       pair: { S: pair },
//     },
//   };

//   const result = await dynamoDbClient.send(new GetItemCommand(params));
//   const item = result.Item;

//   if (item && item.pair?.S && item.price?.S && item.lastUpdated?.N) {
//     return {
//       name: item.pair.S,
//       price: item.price.S,
//       lastUpdated: parseInt(item.lastUpdated.N, 10),
//     };
//   }
// }

// export async function cachePrice(pair: string, price: string): Promise<void> {
//   const params = {
//     TableName: TABLE_NAME,
//     Item: {
//       pair: { S: pair },
//       price: { S: price },
//       lastUpdated: { N: Date.now().toString() },
//     },
//   };

//   await dynamoDbClient.send(new PutItemCommand(params));
// }

// export function isPriceStale(lastUpdated: number): boolean {
//   const ttl = 60000; // TTL in milliseconds (1 minute)
//   return Date.now() > lastUpdated + ttl;
// }
