export type LiquidStakingInfo = {
  objectId: string;
  version: string;
  digest: string;
  content: {
    dataType: string;
    type: string;
    hasPublicTransfer: boolean;
    fields: {
      accrued_spread_fees: string;
      fees: string;
      fee_config: {
        type: string;
        fields: {
          element: {
            type: string;
            fields: FeeConfig;
          };
        };
        //add more fields as per use
      };
      lst_treasury_cap: {
        type: string;
        fields: {
          total_supply: {
            type: string;
            fields: {
              value: string;
            };
          };
        };
      };
      storage: {
        type: string;
        fields: {
          last_refresh_epoch: string;
          total_sui_supply: string;
          total_weight: string;
          // add more as per use
        };
      };
    };
  };
};

export type FeeConfig = {
  custom_redeem_fee_bps: string;
  flash_stake_fee_bps: string;
  redeem_fee_bps: string;
  redeem_fee_distribution_component_bps: string;
  spread_fee_bps: string;
  staked_sui_mint_fee_bps: string;
  staked_sui_redeem_fee_bps: string;
  sui_mint_fee_bps: string;
};
