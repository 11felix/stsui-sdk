const CONF_ENV = "production";

const conf = {
  testing: {
    // General Contants
    STSUI_FIRST_PACKAGE_ID:
      "0xc9fc101b482220270153961cd831ec8291cb3b24eb5326033c879a9861e659f9",

    STSUI_LATEST_PACKAGE_ID:
      "0xee4beb73746391fc1eba3d70d6c14cf9e4ed4d68c5a0b2f6d6bcbfa0438813d1",

    LST_INFO:
      "0xc8806a0f5aa99bb10a97be162eda2d94b7196e66a696b899ebaef07e677ed85e",

    ADMIN_CAP:
      "0x211d66fa8e363d1381c9b83f3e75cd3a2856647492ebf3160085e80b8e8a4a7e",

    COLLECTION_FEE_CAP_ID:
      "0x26c607cdbb2063d6eb2900e63c80181f482996d65bf96c986d76c1264099b88a",

    SUI_SYSTEM_STATE_OBJECT_ID: "0x5",

    // Coin Types
    ALPHA_COIN_TYPE:
      "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",

    SUI_COIN_TYPE: "0x2::sui::SUI",

    STSUI_COIN_TYPE:
      "0x340528e229b5588fcc683de37a3c04112f4863c6311bfdd48574f612bc9b4757::st_sui::ST_SUI",
  },

  production: {
    // General Contants

    STSUI_FIRST_PACKAGE_ID:
      "0xac608850e8d93d379de3d87f98da6c07be907d163fbe33383a829aab47633dae",

    STSUI_LATEST_PACKAGE_ID:
      "0xac608850e8d93d379de3d87f98da6c07be907d163fbe33383a829aab47633dae",

    LST_INFO:
      "0x654f509e4c9ca5fe798e5bed7b8521d2eef5d0a1fc614d849fd1f8b370d998b2",

    ADMIN_CAP:
      "0x32871d776da64eb51eb3c8d6bb96f888a8ffb8c005b13da804b6f61417de23f3",

    COLLECTION_FEE_CAP_ID:
      "0xe3165a3d30e6fe913478955133c67bf457992b09fdd2c1e6371da1ee3fa296aa",

    SUI_SYSTEM_STATE_OBJECT_ID: "0x5",

    // Coin Types
    ALPHA_COIN_TYPE:
      "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",

    SUI_COIN_TYPE: "0x2::sui::SUI",

    STSUI_COIN_TYPE:
      "0x3f59d6777528ef4f73ea7981c3f3ae0a522aece3efc04dc06c0c07218f284775::st_sui::ST_SUI",
  },
};

export function getConf() {
  return conf[CONF_ENV];
}
