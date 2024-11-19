import { stSuiExchangeRate } from "../src/common/utils.ts";
import {
  conf,
  CONF_ENV,
  create_lst,
  set_validators,
  mint as mintStsui,
  redeem,
  collect_fee,
  refresh,
} from "../src/index.ts";
import {
  dryRunTransactionBlock,
  executeTransactionBlock,
  getExecStuff,
} from "./utils.ts";

async function createLst() {
  const { address } = getExecStuff();
  const txb = await create_lst(
    "0xffa973e9be1e88af45cb9145bd05facbf064f8aeb3b196b2876baac20814c4bf",
    conf[CONF_ENV].STSUI_COIN_TYPE,
    10,
    10,
    1000,
    { address },
  );
  //   dryRunTransactionBlock(txb);
  executeTransactionBlock(txb);
}

// createLst();

async function setValidators() {
  const txb = await set_validators(
    [
      "0xa0920b0776bf13ee51b009c97b85dbf48100ae1510623b9a767450e4a481a1e2",
      "0x9275c6e27c1ce98b08edb3d88e71880520aa114fbf3745d333252f7a47672882",
    ],
    [90, 10],
  );
  if (txb)
    // dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
}
// setValidators();

async function mint() {
  const { address } = getExecStuff();
  const txb = await mintStsui("5000000000", { address });
  if (txb)
    // dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
}
// mint();

async function redeemstsui() {
  const { address } = getExecStuff();
  const txb = await redeem("14985000000", { address });
  if (txb) {
    // dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
  }
}
// redeemstsui()

async function collectFee() {
  const { address } = getExecStuff();
  const txb = await collect_fee({ address });
  if (txb) {
    executeTransactionBlock(txb);
  }
}
// collectFee();

async function xrate() {
  console.log(await stSuiExchangeRate());
}
// xrate();

async function refreshh() {
  const txb = await refresh();
  if (txb) {
    executeTransactionBlock(txb);
  }
}
// refreshh();
