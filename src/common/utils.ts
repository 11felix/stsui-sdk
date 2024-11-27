import { getSuiClient, getConf, LiquidStakingInfo } from "../index.js";
import { Decimal } from "decimal.js";

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
