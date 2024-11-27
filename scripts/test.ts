import { stSuiExchangeRate } from "../src/common/utils.ts";
import {
  getConf,
  create_lst,
  set_validators,
  mint as mintStsui,
  redeem,
  collect_fee,
  refresh,
  updateFees,
} from "../src/index.ts";
import {
  dryRunTransactionBlock,
  executeTransactionBlock,
  getExecStuff,
} from "./utils.ts";
// mainnet st sui treasury cap: 0xfeec68daa7a6a595834cdd0c74be1ecd55b3108ff07721623ae90ae41a53fedd
async function createLst() {
  const { address } = getExecStuff();
  const txb = await create_lst(
    "0xfeec68daa7a6a595834cdd0c74be1ecd55b3108ff07721623ae90ae41a53fedd",
    getConf().STSUI_COIN_TYPE,
    10,
    10,
    1000,
    10000,
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
    [50, 50],
  );
  if (txb) dryRunTransactionBlock(txb);
  // executeTransactionBlock(txb);
}
// setValidators();

async function mint() {
  const { address } = getExecStuff();
  const txb = await mintStsui("1000000", { address });
  if (txb) dryRunTransactionBlock(txb);
  //   executeTransactionBlock(txb);
}
// mint();

async function redeemstsui() {
  const { address } = getExecStuff();
  const txb = await redeem("9990000000", { address });
  if (txb) {
    // dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
  }
}
// redeemstsui();

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
xrate();

async function refreshh() {
  const txb = await refresh();
  if (txb) {
    executeTransactionBlock(txb);
    // dryRunTransactionBlock(txb);
  }
}
// refreshh();

async function update_fee() {
  const txb = await updateFees(0, 2, 1000, 10000);
  if (txb) {
    dryRunTransactionBlock(txb);
    // executeTransactionBlock(txb);
  }
}
// update_fee();
