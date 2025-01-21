# stSUI SDK

## Installation

```bash
npm i @stsui-sdk
```

## How to create your own liquid staking token

- Write a simple contract to create a coin that will also represent your liquid staking token, stSUI for example.
  - Upon publishing the contract, you will receive your coin's treasury cap and get your lst's sui move type ({packageid}::{module name}::{coin struct name}).
- To turn your coin into a liquid staking token using our framework:
  - You need to initialize [LstParams](https://alphafitech.github.io/stsui-sdk/types/LstParams.html) first.
    ```typescript
    const lstParams: LstParams = {
      lstCointype:
        "0xabcd2358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd8abcd::demo::DEMO", // your lst's move type
      treasuryCap:
        "0xabcdc88f4ac2eeeb5ac13917c4d3ce147228b62295d51dff4950abd3bb4cabcd", // object id of your treasury cap
    };
    ```
  - Instantiate Admin class
    ```typescript
    const admin = new Admin(lstParams);
    ```
  - Call the [createLst](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#createlst) method in the [Admin](https://alphafitech.github.io/stsui-sdk/classes/Admin.html) class.
    refer to [this](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#createlst) for information on the arguments to createLst method.
    ```typescript
    const txb = await admin.createLst(0, 1, 600, 10000, address);
    await suiClient
      .signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
        requestType: "WaitForLocalExecution",
        options: {
          showEffects: true,
          showBalanceChanges: true,
          showObjectChanges: true,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch((error) => {
        console.error(error);
      });
    ```
  - [LiquidStakingInfo](https://alphafitech.github.io/stsui-sdk/types/LiquidStakingInfo.html) shared object will be created and will be further used to call every other function corresponding to your lst.
  - Admin cap and collection fee cap will be transferred to the address provided in the createLst method.
  - These caps will be used to call other admin functions like [setValidators](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#setvalidators), [collectFee](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#createlst) and [updateFee](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#updatefee).

## API Reference

## `Admin`

Refer to [Admin](https://alphafitech.github.io/stsui-sdk/classes/Admin.html) class for admin specific operations specific to your custom liquid staking token.

- Create your own lst

  - refer [createLst](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#createlst)

- Set validators for your lst

  - refer [setValidators](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#setvalidators)

- Collect the fee collected by your lst

  - refer [collectFee](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#collectfee)

- Update the fee settings for your lst

  - refer [updateFee](https://alphafitech.github.io/stsui-sdk/classes/Admin.html#updatefee)

## `LST`

Refer to [LST](https://alphafitech.github.io/stsui-sdk/classes/LST.html) class for standard lst operations

- Mint

  - refer [mint](https://alphafitech.github.io/stsui-sdk/classes/LST.html#mint)

- Redeem

  - refer [redeem](https://alphafitech.github.io/stsui-sdk/classes/LST.html#redeem)

- Refresh

  - refer [refresh](https://alphafitech.github.io/stsui-sdk/classes/LST.html#redeem)

## `Utils`

Refer to [utils](https://alphafitech.github.io/stsui-sdk/classes/Utils.html) class for common utility functions
