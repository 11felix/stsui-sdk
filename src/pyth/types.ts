export type PythPriceFeed = {
  [key: string]: { [key in "symbol" | "priceId" | "name"]: string };
};

export type CoinGeckoPriceFeed = {
  [key: string]: { [key in "coinId" | "name"]: string };
};

export type PythPriceIdPair =
  | "SUI/USD"
  | "VSUI/USD"
  | "AFSUI/USD"
  | "HASUI/USD"
  | "USDC/USD"
  | "USDT/USD"
  | "CETUS/USD"
  | "TURBOS/USD"
  | "SCA/USD"
  | "CELO/USD"
  | "WBTC/USD"
  | "SLP/USD"
  | "SOL/USD"
  | "APT/USD"
  | "WETH/USD"
  | "ALPHA/USD"
  | "USDY/USD"
  | "NAVX/USD"
  | "BUCK/USD"
  | "WUSDC/USD"
  | "WSOL/USD"
  | "ALPHA/USD"
  | "FUD/USD"
  | "BLUB/USD"
  | "ETH/USD"
  | "DEEP/USD"
  | "AUSD/USD";
