export enum GaugeShareAttributes {
  Id = 'id',
  UserAddress = 'user',
  GaugeId = 'gauge',
  Balance = 'balance',
}

export type GaugeShareAttribute =
  | GaugeShareAttributes.Id
  | GaugeShareAttributes.UserAddress
  | GaugeShareAttributes.GaugeId
  | GaugeShareAttributes.Balance;

export interface GaugeShare {
  id: string;
  balance: string;
  userAddress: string;
  gauge: {
    id: string;
    poolId?: string;
    isKilled: boolean;
  };
}
