import { exec } from "child_process";
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
  getFees,
  FeeConfig,
  Events,
  fetchStSuiAPR,
  fetchStSuiAPY,
  fetchTotalStakers,
  updateTotalStakers,
} from "../src/index.ts";
import {
  dryRunTransactionBlock,
  executeTransactionBlock,
  getExecStuff,
} from "./utils.ts";
// mainnet st sui treasury cap: 0x6fbb491b186092d8e5bdad44891e64e0177ffa3f318af1004cfd5db904805aa4
async function createLst() {
  const { address } = getExecStuff();
  const txb = await create_lst(
    "0x84d74e399c3b47e809aa13e23badadaee9ea425dacbac804ed71326f4f5ab0ac",
    getConf().STSUI_COIN_TYPE,
    0,
    1,
    600,
    10000,
    { address },
  );
  //   dryRunTransactionBlock(txb);
  executeTransactionBlock(txb);
}

//createLst();

async function setValidators() {
  const txb = await set_validators(
    ["0xcb7efe4253a0fe58df608d8a2d3c0eea94b4b40a8738c8daae4eb77830c16cd7"],
    [100],
  );
  if (txb)
    //dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
}
//setValidators();

async function mint() {
  const { address } = getExecStuff();
  const txb = await mintStsui("1000000000", { address });
  if (txb) {
    // dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
  }
}
// mint();

async function redeemstsui() {
  const { address } = getExecStuff();
  const txb = await redeem("100899000", { address });
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
  // console.log((await getFees()) as FeeConfig);
}
// xrate();

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

async function epochEvents() {
  let ok = await Events.getEpochChangeEvents({
    startTime: 1733776365964,
    endTime: 1733827977386,
  });
  console.log(ok);
}
// epochEvents();

async function apr() {
  console.log(await fetchStSuiAPR(2));
}
// apr();
async function apy() {
  console.log(await fetchStSuiAPY(1));
}
// apy();

async function totalStakers() {
  let txb = await updateTotalStakers();
  if (txb) {
    // executeTransactionBlock(txb);
    dryRunTransactionBlock(txb);
  }
}
totalStakers();

async function fetchTotalStakerss() {
  console.log(await fetchTotalStakers());
}
// fetchTotalStakerss()
