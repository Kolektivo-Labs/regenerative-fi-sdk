import { LinearPoolExit } from './concerns/linear/exit.concern';
import { LinearPoolJoin } from './concerns/linear/join.concern';
import { LinearPoolLiquidity } from './concerns/linear/liquidity.concern';
import { LinearPoolSpotPrice } from './concerns/linear/spotPrice.concern';
import { LinearPriceImpact } from './concerns/linear/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Linear implements PoolType {
  public exit: ExitConcern;
  public join: JoinConcern;
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;

  constructor(chainId: number) {
    this.exit = new LinearPoolExit(chainId);
    this.join = new LinearPoolJoin(chainId);
    this.liquidity = new LinearPoolLiquidity();
    this.spotPriceCalculator = new LinearPoolSpotPrice();
    this.priceImpactCalculator = new LinearPriceImpact();
  }
}
