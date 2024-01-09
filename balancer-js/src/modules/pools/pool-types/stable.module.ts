import { StablePoolExit } from './concerns/stable/exit.concern';
import { StablePoolJoin } from './concerns/stable/join.concern';
import { StablePoolLiquidity } from './concerns/stable/liquidity.concern';
import { StablePoolSpotPrice } from './concerns/stable/spotPrice.concern';
import { StablePoolPriceImpact } from './concerns/stable/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Stable implements PoolType {
  public exit: ExitConcern;
  public join: JoinConcern;
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;

  constructor(chainId: number) {
    this.exit = new StablePoolExit(chainId);
    this.join = new StablePoolJoin(chainId);
    this.liquidity = new StablePoolLiquidity();
    this.spotPriceCalculator = new StablePoolSpotPrice();
    this.priceImpactCalculator = new StablePoolPriceImpact();
  }
}
