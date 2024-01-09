import { WeightedPoolExit } from './concerns/weighted/exit.concern';
import { WeightedPoolJoin } from './concerns/weighted/join.concern';
import { WeightedPoolLiquidity } from './concerns/weighted/liquidity.concern';
import { WeightedPoolSpotPrice } from './concerns/weighted/spotPrice.concern';
import { WeightedPoolPriceImpact } from './concerns/weighted/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Weighted implements PoolType {
  public exit: ExitConcern;
  public join: JoinConcern;
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;

  constructor(chainId: number) {
    this.exit = new WeightedPoolExit(chainId);
    this.join = new WeightedPoolJoin(chainId);
    this.liquidity = new WeightedPoolLiquidity();
    this.spotPriceCalculator = new WeightedPoolSpotPrice();
    this.priceImpactCalculator = new WeightedPoolPriceImpact();
  }
}
