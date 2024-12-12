import {
  getSuiClient,
  getConf,
  LiquidStakingInfo,
  FeeConfig,
  Events,
} from "../index.js";
import { Decimal } from "decimal.js";
import { getLatestPrices } from "../pyth/pyth.js";
import { bech32 } from "bech32";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

export async function stSuiExchangeRate(): Promise<string> {
  const lstInfo = await getLstInfo();
  if (!lstInfo) {
    console.error("couldnt fetch lst info object");
    return "0";
  }
  const totalSuiSupply = new Decimal(
    lstInfo.content.fields.storage.fields.total_sui_supply.toString(),
  ).minus(new Decimal(lstInfo.content.fields.accrued_spread_fees));
  const totalStSuiSupply = new Decimal(
    lstInfo.content.fields.lst_treasury_cap.fields.total_supply.fields.value.toString(),
  );
  if (totalStSuiSupply.eq(0)) {
    return "0";
  }
  return totalSuiSupply.div(totalStSuiSupply).toString();
}

export async function getLstInfo(): Promise<LiquidStakingInfo | undefined> {
  const lstInfo = (
    await getSuiClient().getObject({
      id: getConf().LST_INFO,
      options: {
        showContent: true,
      },
    })
  ).data as LiquidStakingInfo;
  return lstInfo;
}

export const stStuiCirculationSupply = async () => {
  try {
    const lstInfo = await getLstInfo();
    if (!lstInfo) {
      console.error("couldnt fetch lst info object");
      return "0";
    }
    const totalStSuiSupply = new Decimal(
      lstInfo.content.fields.lst_treasury_cap.fields.total_supply.fields.value.toString(),
    );
    const suiPrice = await getLatestPrices(["SUI/USD"], false);
    const stSuiExchRate = await stSuiExchangeRate();
    const StSuitotalSupply = (
      (parseFloat(totalStSuiSupply.toString()) *
        parseFloat(suiPrice[0]) *
        parseFloat(stSuiExchRate)) /
      10 ** 9
    ).toFixed(0);
    return StSuitotalSupply;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const fetchTotalSuiStaked = async () => {
  try {
    const lstInfo = await getLstInfo();
    if (!lstInfo) {
      console.error("couldnt fetch lst info object");
      return "0";
    }
    const totalSuiStaked = new Decimal(
      lstInfo.content.fields.storage.fields.total_sui_supply.toString(),
    ).minus(new Decimal(lstInfo.content.fields.accrued_spread_fees));
    return totalSuiStaked.div(10 ** 9);
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const fetchCurrentStSuiEpoch = async () => {
  try {
    const currentEpoch = (await getSuiClient().getLatestSuiSystemState()).epoch;
    return currentEpoch;
  } catch (error) {
    console.log("error", error);
    return "0";
  }
};

export const fetchStSuiAPR = async (days: number): Promise<string> => {
  try {
    if (days === 0) {
      return "0";
    }
    const endTime = Date.now();
    const startTime = endTime - (days + 1) * 86400000;
    const epochChangeEvents = await Events.getEpochChangeEvents({
      startTime: startTime,
      endTime: endTime,
    });
    if (epochChangeEvents.length < 2) {
      return "0";
    }
    let apr = new Decimal(0);
    let sumOfAprs = new Decimal(0);

    for (let i = 1; i < epochChangeEvents.length; i++) {
      const e0 = epochChangeEvents[i - 1];
      const e1 = epochChangeEvents[i];
      const newRatio = new Decimal(
        Number(e0.event.new_sui_supply) - Number(e0.event.spread_fee),
      ).div(e0.event.lst_supply);
      const oldRatio = new Decimal(
        Number(e1.event.new_sui_supply) - Number(e1.event.spread_fee),
      ).div(e1.event.lst_supply);
      const changeInAYear = newRatio
        .minus(oldRatio)
        .mul(100 * 365)
        .div(oldRatio);

      sumOfAprs = sumOfAprs.plus(changeInAYear);
    }
    apr = sumOfAprs.div(epochChangeEvents.length - 1);
    return apr.toString();
  } catch (error) {
    console.log("error", error);
    return "0";
  }
};

export const fetchStSuiAPY = async (days: number): Promise<string> => {
  try {
    const apr = await fetchStSuiAPR(days);
    const apy = convertAprToApy(Number(apr));
    return apy.toString();
  } catch (e) {
    console.log("error", e);
    return "0";
  }
};
function convertAprToApy(apr: number): number {
  const n = 365;
  const apy = 100 * (Math.pow(1 + apr / 100 / n, n) - 1);
  return apy;
}
export const fetchTotalStakers = async () => {
  try {
    //find the exact formula here
    return 3000;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const getFees = async (): Promise<FeeConfig | undefined> => {
  try {
    const lstInfo = await getLstInfo();
    if (!lstInfo) {
      console.error("couldnt fetch lst info object");
      return;
    }
    return lstInfo.content.fields.fee_config.fields.element.fields as FeeConfig;
  } catch (e) {
    console.error("error", e);
  }
};
export const fetchAPY = () => {};

//--------------- others ------------------
// Function to decode Bech32 private key
function decodeBech32PrivateKey(bech32Key: string): Uint8Array {
  const decoded = bech32.decode(bech32Key);
  const decodedBytes = Buffer.from(bech32.fromWords(decoded.words));

  // Strip leading byte if the key is 33 bytes
  if (decodedBytes.length === 33) {
    return decodedBytes.subarray(1);
  }

  if (decodedBytes.length !== 32) {
    throw new Error(
      `Invalid secretKey size. Expected 32 bytes, got ${decodedBytes.length}.`,
    );
  }

  return decodedBytes;
}

// Function to create signer
export function createSigner(bech32Key: string) {
  const privateKeyBytes = decodeBech32PrivateKey(bech32Key);
  const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);
  return keypair;
}
