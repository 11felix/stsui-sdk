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
