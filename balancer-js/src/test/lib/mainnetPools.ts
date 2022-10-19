import { SubgraphPoolBase, Network } from '@/.';
import { getNetworkConfig } from '@/modules/sdk.helpers';
import { getOnChainBalances } from '@/modules/sor/pool-data/onChainData';
import { JsonRpcProvider } from '@ethersproject/providers';
import { factories } from '../factories';

export const B_50WBTC_50WETH = factories.subgraphPoolBase.build({
  id: '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e',
  address: '0xa6f548df93de924d73be7d25dc02554c6bd66db5',
  tokens: [
    factories.subgraphToken.transient({ symbol: 'wETH' }).build(),
    factories.subgraphToken.transient({ symbol: 'wBTC' }).build(),
  ],
});

export const BAL_WETH = factories.subgraphPoolBase.build({
  id: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
  address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
  tokens: [
    factories.subgraphToken.transient({ symbol: 'wETH' }).build(),
    factories.subgraphToken.transient({ symbol: 'BAL' }).build(),
  ],
});

export const DAI_WETH = factories.subgraphPoolBase.build({
  id: '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
  address: '0x0b09deA16768f0799065C475bE02919503cB2a35',
  tokens: [
    factories.subgraphToken.transient({ symbol: 'wETH' }).build(),
    factories.subgraphToken.transient({ symbol: 'DAI' }).build(),
  ],
});

export const USDC_WETH = factories.subgraphPoolBase.build({
  id: '0x96646936b91d6b9d7d0c47c496afbf3d6ec7b6f8000200000000000000000019',
  address: '0x96646936b91d6b9d7d0c47c496afbf3d6ec7b6f8',
  tokens: [
    factories.subgraphToken.transient({ symbol: 'wETH' }).build(),
    factories.subgraphToken.transient({ symbol: 'USDC' }).build(),
  ],
});

export const AURA_BAL_STABLE = factories.subgraphPoolBase.build({
  id: '0x3dd0843a028c86e0b760b1a76929d1c5ef93a2dd000200000000000000000249',
  address: '0x3dd0843a028c86e0b760b1a76929d1c5ef93a2dd',
  tokens: [
    factories.subgraphToken.transient({ symbol: 'auraBAL' }).build(),
    factories.subgraphToken.transient({ symbol: 'B80BAL20WETH' }).build(),
  ],
  poolType: 'Stable',
});

export const getForkedPools = async (
  provider: JsonRpcProvider,
  pools: SubgraphPoolBase[] = [B_50WBTC_50WETH]
): Promise<SubgraphPoolBase[]> => {
  const network = getNetworkConfig({ network: Network.MAINNET, rpcUrl: '' });

  // btcEthPool from mainnet, balances and total shares are fetched from on chain data
  const onChainPools = await getOnChainBalances(
    pools,
    network.addresses.contracts.multicall,
    network.addresses.contracts.vault,
    provider
  );

  return onChainPools;
};