# stSUI SDK

## Installation

```bash
npm i @stsui-sdk
```

## API Reference

## `mint`

Call mint function to stake SUI and get stSUI.

```typescript
import { mint } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";
const stakeSUI: Transaction = await mint(amount, { address: wallet_address });
```

## `redeem`

Call this to unstake stSUI and get SUI in return.

```typescript
import { redeem } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const unstakeStSUI: Transaction = await redeem(amount, {
  address: wallet_address,
});
```

## `fetchStSuiAPR`

Call this to get apr for stSUI.

```typescript
import { fetchStSuiAPR } from "@stsui-sdk";
const days: number = 365; //for a year
const stSuiAPR: string = await fetchStSuiAPR(days);
```

## `stSuiExchangeRate`

Call this to get exchange rate of stSUI.

```typescript
import { stSuiExchangeRate } from "@stsui-sdk";

const exchangeRateOfStSui: string = await stSuiExchangeRate();
```

## `stStuiCirculationSupply`

Call this to get tvl of stSUI.

```typescript
import { stStuiCirculationSupply } from "@stsui-sdk";

const tvl: string = await stStuiCirculationSupply();
```
