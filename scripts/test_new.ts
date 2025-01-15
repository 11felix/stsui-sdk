import { exec } from "child_process";
import { stSuiExchangeRate } from "../src/common/utils.ts";
import {
  getConf,
  create_lst,
  // set_validators,
  mint as mintStsui,
  redeem,
  collect_fee,
  refresh,
  // updateFees,
  getFees,
  FeeConfig,
  Events,
  fetchStSuiAPR,
  fetchStSuiAPY,
  fetchTotalStakers,
  updateTotalStakers,
  LST,
  Admin,
} from "../src/index.ts";
import {
  dryRunTransactionBlock,
  executeTransactionBlock,
  getExecStuff,
} from "./utils.ts";
import { Utils } from "../src/common/common.ts";
// mainnet st sui treasury cap: 0x6fbb491b186092d8e5bdad44891e64e0177ffa3f318af1004cfd5db904805aa4

//for 3rd party usage
//collection fee cap: 0xfd3adebe46134c30691ef6bf687ac27ffcbb0ef66ca6d3eb81e04526ef5e147a
//admin cap: 0xef16388aceac177026df378670e3fc161be1b5d6635945585ba7e1481ddad975
//lst info: 0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33
async function createLst() {
  const { address } = getExecStuff();
  const admin = new Admin({
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
    treasuryCap:
      "0x91fec88f4ac2eeeb5ac13917c4d3ce147228b62295d51dff4950abd3bb4c93e4",
  });
  const txb = await admin.createLst(
    0,
    1,
    600,
    10000,
    "0xa511088cc13a632a5e8f9937028a77ae271832465e067360dd13f548fe934d1a",
  );
  if (txb) {
    //   dryRunTransactionBlock(txb);
    executeTransactionBlock(txb);
  }
}

// createLst();

async function setValidators() {
  const admin = new Admin({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33",
    adminCap:
      "0xef16388aceac177026df378670e3fc161be1b5d6635945585ba7e1481ddad975",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
  });
  const txb = await admin.setValidators(
    ["0xcb7efe4253a0fe58df608d8a2d3c0eea94b4b40a8738c8daae4eb77830c16cd7"],
    [100],
  );
  if (txb) {
    dryRunTransactionBlock(txb);
    // executeTransactionBlock(txb);
  }
}
// setValidators();

async function mint() {
  const { address } = getExecStuff();
  const lst = new LST({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
  });

  const txb = await lst.mint("100000000", address);
  if (txb) {
    dryRunTransactionBlock(txb);
    // executeTransactionBlock(txb);
  }
}
// mint();

async function redeemstsui() {
  const { address } = getExecStuff();
  const lst = new LST({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
  });
  const txb = await lst.redeem("25000000", address);
  if (txb) {
    dryRunTransactionBlock(txb);
    // executeTransactionBlock(txb);
  }
}
// redeemstsui();

// async function collectFee() {
//   const { address } = getExecStuff();
//   const txb = await collect_fee({ address });
//   if (txb) {
//     executeTransactionBlock(txb);
//   }
// }
// collectFee();

// async function xrate() {
//     const utils = new Utils({lstInfo: "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33", lstCointype: "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU"});
//   console.log(await utils.lstExchangeRate(true));
//   // console.log((await getFees()) as FeeConfig);
// }
// xrate();

async function refreshh() {
  const lst = new LST({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
  });
  const txb = await lst.refresh();
  if (txb) {
    // executeTransactionBlock(txb);
    dryRunTransactionBlock(txb);
  }
}
// refreshh();

async function update_fee() {
  const admin = new Admin({
    lstInfo:
      "0xc1d996e18df1cc82a8c014c6d8290048ed30dafb34cd6b43ab9fde77f7e4bf33",
    lstCointype:
      "0x34732358cebfdf4ee29534f906cbb36a78dfaaa256e7d9ddb7e789e2dd878eb::padu::PADU",
    adminCap:
      "0xef16388aceac177026df378670e3fc161be1b5d6635945585ba7e1481ddad975",
  });
  const txb = await admin.updateFee(0, 1, 600, 5000);
  if (txb) {
    dryRunTransactionBlock(txb);
    // executeTransactionBlock(txb);
  }
}
// update_fee();

// async function epochEvents() {
//   let ok = await Events.getEpochChangeEvents({
//     startTime: 1733776365964,
//     endTime: 1733827977386,
//   });
//   console.log(ok);
// }
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
// totalStakers();

async function fetchTotalStakerss() {
  console.log(await fetchTotalStakers());
}
// fetchTotalStakerss()

// async function getRedeemEvents() {
//   console.log(
//     await Events.getRedeemEvents({
//       startTime: 1735660741000,
//       endTime: 1735660801000,
//     }),
//   );
// }
// getRedeemEvents();
