import BN from "bn.js";

export type CoinName =
  | "ALPHA"
  | "SUI"
  | "USDC"
  | "USDT"
  | "VSUI"
  | "NAVX"
  | "SCA"
  | "CETUS"
  | "AFSUI"
  | "WETH"
  | "APT"
  | "WSOL"
  | "SLP"
  | "WBTC"
  | "CELO"
  | "TURBOS"
  | "HASUI"
  | "USDY"
  | "BUCK"
  | "FUD"
  | "BLUB"
  | "WUSDC"
  | "ETH"
  | "DEEP"
  | "AUSD"
  | "STSUI";

export type CoinType =
  | "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA"
  | "0x2::sui::SUI"
  | "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT"
  | "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN"
  | "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN"
  | "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX"
  | "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA"
  | "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI"
  | "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN"
  | "0x3a5143bb1196e3bcdfab6203d1683ae29edd26294fc8bfeafe4aaa9d2704df37::coin::COIN"
  | "0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN"
  | "0xc44d97a4bc4e5a33ca847b72b123172c88a6328196b71414f32c3070233604b2::slp::SLP"
  | "0x27792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN"
  | "0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f::coin::COIN"
  | "0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS"
  | "0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS"
  | "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"
  | "0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb::usdy::USDY"
  | "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK"
  | "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD"
  | "0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB"
  | "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC"
  | "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH"
  | "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP"
  | "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD"
  | "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI";

export type Icon =
  | "https://coinmeta.polymedia.app/img/coins/0x0000000000000000000000000000000000000000000000000000000000000002-sui-SUI.svg"
  | "https://coinmeta.polymedia.app/img/coins/0x0000000000000000000000000000000000000000000000000000000000000002-sui-SUI.svg"
  | "https://coinmeta.polymedia.app/img/coins/0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55-cert-CERT.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5-navx-NAVX.webp"
  | "https://suivision.xyz/images/coin-default.png"
  | "https://coinmeta.polymedia.app/img/coins/0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6-sca-SCA.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc-afsui-AFSUI.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0x3a5143bb1196e3bcdfab6203d1683ae29edd26294fc8bfeafe4aaa9d2704df37-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xc44d97a4bc4e5a33ca847b72b123172c88a6328196b71414f32c3070233604b2-slp-SLP.webp"
  | "https://coinmeta.polymedia.app/img/coins/0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f-coin-COIN.webp"
  | "https://coinmeta.polymedia.app/img/coins/0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b-cetus-CETUS.webp"
  | "https://coinmeta.polymedia.app/img/coins/0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a-turbos-TURBOS.svg"
  | "https://7taj6jfau6n3dri7agspzfnva7qbj5sizz5xc3lb56nmxpsyoiba.arweave.net/_MCfJKCnm7HFHwGk_JW1B-AU9kjOe3FtYe-ay75YcgI"
  | "https://coinmeta.polymedia.app/img/coins/0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d-hasui-HASUI.svg"
  | "https://coinmeta.polymedia.app/img/coins/0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb-usdy-USDY.svg"
  | "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/buck.svg/public"
  | ""
  | "https://coinmeta.polymedia.app/img/coins/0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf-coin-COIN.webp"
  | ""
  | "";

export interface Coin {
  name: CoinName;
  type: CoinType;
  icon: Icon;
  expo: number;
}

export type CoinAmounts = {
  coinA: BN;
  coinB: BN;
};
