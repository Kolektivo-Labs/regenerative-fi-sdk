import { StablePoolLiquidity } from './concerns/stable/liquidity.concern';
import { PhantomStablePoolSpotPrice } from './concerns/stablePhantom/spotPrice.concern';
import { StablePoolPriceImpact } from './concerns/stable/priceImpact.concern';
import { ComposableStablePoolJoin } from './concerns/composableStable/join.concern';
import { ComposableStablePoolExit } from './concerns/composableStable/exit.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class ComposableStable implements PoolType {
  public exit: ExitConcern;
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;
  public join: JoinConcern;

  constructor(chainId: number) {
    this.exit = new ComposableStablePoolExit(chainId);
    this.liquidity = new StablePoolLiquidity();
    this.spotPriceCalculator = new PhantomStablePoolSpotPrice();
    this.priceImpactCalculator = new StablePoolPriceImpact();
    this.join = new ComposableStablePoolJoin(chainId);
  }
}
