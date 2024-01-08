import { BalancerSdkConfig, PoolType } from '@/types';
import { Stable } from './pool-types/stable.module';
import { ComposableStable } from './pool-types/composableStable.module';
import { Weighted } from './pool-types/weighted.module';
import { MetaStable } from './pool-types/metaStable.module';
import { StablePhantom } from './pool-types/stablePhantom.module';
import { Linear } from './pool-types/linear.module';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import { isLinearish } from '@/lib/utils';
import { FX } from '@/modules/pools/pool-types/fx.module';
import { Gyro } from '@/modules/pools/pool-types/gyro.module';
import { getNetworkConfig } from '../sdk.helpers';

/**
 * Wrapper around pool type specific methods.
 *
 * Returns a class instance of a type specific method handlers.
 */
export class PoolTypeConcerns {
  public weighted: Weighted;
  public stable: Stable;
  public composableStable: ComposableStable;
  public metaStable: MetaStable;
  public stablePhantom: StablePhantom;
  public linear: Linear;

  constructor(config: BalancerSdkConfig) {
    const networkConfig = getNetworkConfig(config);
    this.weighted = new Weighted(networkConfig.chainId);
    this.stable = new Stable();
    this.composableStable = new ComposableStable(networkConfig.chainId);
    this.metaStable = new MetaStable();
    this.stablePhantom = new StablePhantom();
    this.linear = new Linear();
  }

  static from(
    poolType: PoolType,
    chainId: number
  ):
    | Weighted
    | Stable
    | ComposableStable
    | MetaStable
    | StablePhantom
    | Linear {
    // Calculate spot price using pool type
    switch (poolType) {
      case 'ComposableStable': {
        return new ComposableStable(chainId);
      }
      case 'FX': {
        return new FX();
      }
      case 'GyroE':
      case 'Gyro2':
      case 'Gyro3': {
        return new Gyro();
      }
      case 'MetaStable': {
        return new MetaStable();
      }
      case 'Stable': {
        return new Stable();
      }
      case 'StablePhantom': {
        return new StablePhantom();
      }
      case 'Investment':
      case 'LiquidityBootstrapping':
      case 'Weighted': {
        return new Weighted(chainId);
      }
      default: {
        // Handles all Linear pool types
        if (isLinearish(poolType)) return new Linear();
        throw new BalancerError(BalancerErrorCode.UNSUPPORTED_POOL_TYPE);
      }
    }
  }
}
