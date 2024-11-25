import { getSuiClient, conf, CONF_ENV, LiquidStakingInfo } from "../index.js";
import { Decimal } from "decimal.js";

export async function stSuiExchangeRate(): Promise<string> {
  const lstInfo = await getLstInfo();
  if (!lstInfo) {
    console.error("couldnt fetch lst info object");
    return "0";
  }
  const totalSuiSupply = new Decimal(
    lstInfo.content.fields.storage.fields.total_sui_supply.toString(),
  );
  const totalStSuiSupply = new Decimal(
    lstInfo.content.fields.lst_treasury_cap.fields.total_supply.fields.value.toString(),
  );
  return totalSuiSupply.div(totalStSuiSupply).toString();
}

export async function getLstInfo(): Promise<LiquidStakingInfo | undefined> {
  const lstInfo = (
    await getSuiClient().getObject({
      id: conf[CONF_ENV].LST_INFO,
      options: {
        showContent: true,
      },
    })
  ).data as LiquidStakingInfo;
  return lstInfo;
}
