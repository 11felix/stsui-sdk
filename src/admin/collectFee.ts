import { Transaction } from "@mysten/sui/transactions";
import { conf, CONF_ENV } from "../common/ids";

export async function collect_fee(options: {address:string}):Promise<Transaction|undefined>
{
	const txb = new Transaction();


	const [sui] = txb.moveCall({
		target: conf[CONF_ENV].STSUI_LATEST_PACKAGE_ID+"::liquid_staking::collect_fees",
		arguments: [txb.object(conf[CONF_ENV].LST_INFO), 
					txb.object(conf[CONF_ENV].SUI_SYSTEM_STATE_OBJECT_ID),
                    txb.object(conf[CONF_ENV].ADMIN_CAP)
				],
		typeArguments: [conf[CONF_ENV].STSUI_COIN_TYPE],
	})
	txb.transferObjects([sui], options.address)
    return txb;
}