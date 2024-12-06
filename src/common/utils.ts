import { getSuiClient, getConf, LiquidStakingInfo } from "../index.js";
import { Decimal } from "decimal.js";
import { getLatestPrices } from "../pyth/pyth.js";

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
    console.log("sui price", suiPrice);
    const stSuiExchRate = await stSuiExchangeRate();
    console.log("stsui exch rate", stSuiExchRate);
    const StSuitotalSupply = (
      parseFloat(totalStSuiSupply.toString()) *
      parseFloat(suiPrice[0]) *
      parseFloat(stSuiExchRate)
    ).toFixed(0);
    console.log("StSuitotalSupply", StSuitotalSupply);
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
    return totalSuiStaked;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const fetchCurrentStSuiEpoch = async () => {
  try {
    const currentEpoch = (await getSuiClient().getCurrentEpoch()).epoch;
    return currentEpoch;
  } catch (error) {
    console.log("error", error);
    return "0";
  }
};

export const fetchStSuiAPR = async () => {
  try {
    //find the exact formula here
    return 4.3;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const fetchtotalStakers = async () => {
  try {
    //find the exact formula here
    return 3000;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

export const fetchAPY = () => {};
