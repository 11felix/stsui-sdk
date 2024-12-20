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

## `create_lst`

Call this to create a liquid staking token.

```typescript
import { create_lst } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const staking_token: Transaction = await create_lst(treasuryCap: string, lstCoinType: string, mintFeeBps: number, redeemFeeBps: number, spreadFeeBps: number, redistributionFeeBps: number, options: { address: string });
```

## `set_validators`

Call this to set validators for liquid staking token.

```typescript
import { set_validators } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const validator_details: Transaction = await set_validators(addresses: string[], weights: number[]);
```

## `createFeeConfig`

Call this to set fees for liquid staking token.

```typescript
import { createFeeConfig } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const feesConfig: Transaction = await createFeeConfig(mintFeeBps: number, redeemFeeBps: number, spreadFeeBps: number, redistributionFeeBps: number, txb: Transaction);
```

## `updateFees`

Call this to update fees for liquid staking token.

```typescript
import { updateFees } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const feesConfig: Transaction = await updateFees(mintFeeBps: number, redeemFeeBps: number, spreadFeeBps: number, redistributionFeeBps: number);
```

## `collect_fee`

Call this to update fees for liquid staking token.

```typescript
import { collect_fee } from "@stsui-sdk";
import { Transaction } from "@mysten/sui/transactions";

const feesConfig: Transaction = await collect_fee(options: {
  address: string;
});
```
