import { MetaStablePoolLiquidity } from './concerns/metaStable/liquidity.concern';
import { MetaStablePoolSpotPrice } from './concerns/metaStable/spotPrice.concern';
import { StablePoolPriceImpact } from './concerns/stable/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
  PriceImpactConcern,
} from './concerns/types';
import { StablePoolExit } from '@/modules/pools/pool-types/concerns/stable/exit.concern';
import { StablePoolJoin } from '@/modules/pools/pool-types/concerns/stable/join.concern';

export class MetaStable implements PoolType {
  public exit: ExitConcern;
  public join: JoinConcern;
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;

  constructor(chainId: number) {
    this.exit = new StablePoolExit(chainId);
    this.join = new StablePoolJoin(chainId);
    this.liquidity = new MetaStablePoolLiquidity();
    this.spotPriceCalculator = new MetaStablePoolSpotPrice();
    this.priceImpactCalculator = new StablePoolPriceImpact();
  }
}
