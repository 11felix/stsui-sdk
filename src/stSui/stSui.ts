// import { Transaction } from "@mysten/sui/transactions";
// import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
// import {Ed25519Keypair} from "@mysten/sui/keypairs/ed25519";
// import { fromBase64 } from "@mysten/sui/utils";

// const b64PrivateKey = "AIAhWTSPfjao05+XKcFALcp4uyrykfAAQIPXQsX9IDHj"
// const keypair = Ed25519Keypair.fromSecretKey(fromBase64(b64PrivateKey).slice(1));
// console.log(keypair.getPublicKey().toSuiAddress())

// const packageid="0x362207e59d5c85b21bff55ab3d4bfe8a325ad4030e411a0e8ad7d3512dd4f314";
// const origpackageid="0x2c6eaa11fad7f075fb8f6952a16cb310f0852b44cae0ed12e7618c1e9c46b360";
// const coin=origpackageid+"::st_sui::ST_SUI";
// const treasuryCap = "0x63212268e3a64a61c1d1d42abee786c29703b52e7945cb5465db897626c8ac04";
// const myaddress = "0x6150ca514791d95c2b969391d58d3d101398d51d4c7a1feb630a6bffeef7fe03";

// //const lst_info="0x034be28f3c902329bac22a992643d06bc2297b5902ae209d3f8915e6c54b1410";
// const lst_info="0xb85bbe1bee19831dfcd22fa0961683d6ab470bf2a8a8a3142d40ab22465d84f8";
// //const admin_cap="0xb4c01875b7a3cff6a90b07e2fbef28558473b3d91c39a5fbc7086e9a126830df";
// const admin_cap="0xff5c66aa1a16c75d8bcd8a5143e114593ab4d0d372bf4eae3bc16be6de4bf57a";



// const sui_for_mint = "0x819a35696cd3ecc143d466ab8e6ba64eb68a48e7b30d207731005a3dced157cd"





// let lst_coin="0xbe49ebf42ef8b4618f126c9274f3def6262231c849a15c610619b6a128c7837e"


	
// async function execute(txb: Transaction)
// {
// 	const rpcUrl = getFullnodeUrl('testnet');
// 	const cli = new SuiClient({url:"https://testnet-rpc.sui.chainbase.online"})

// 	const result = await cli.signAndExecuteTransaction({
// 		transaction: txb,
// 		signer: keypair,
// 		requestType: 'WaitForLocalExecution',
// 		options: {
// 			showEffects: true,
// 			showBalanceChanges: true,
// 		},
// 	});
// 	console.log(JSON.stringify(result,null,2));

// }

// //create_lst();
// //set_validators();
// //mint();
// //refresh();
// //redeem();
// //reduce_epoch()
// collect_fee();
