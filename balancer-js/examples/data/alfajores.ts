import { BalancerSDK } from '@balancer-labs/sdk';

const sdk = new BalancerSDK({
  customSubgraphUrl:
    'https://api.studio.thegraph.com/query/10166/balancer-rfi/version/latest',
  network: 44787,
  rpcUrl:
    'https://celo-alfajores.infura.io/v3/dc513f59a9df4edca4329dc46c8295b6',
  sor: {
    tokenPriceService: 'subgraph',
  },
});

export const refiPool = {
  id: '0x865fa2412041bcf28a804bcbd220724bd35cb33a000200000000000000000003',
  name: '50BO-50cUSD',
  address: '0x865fa2412041bcf28a804bcbd220724bd35cb33a',
  chainId: 44787,
  poolType: 'Weighted',
  poolTypeVersion: 4,
  swapFee: '0.003',
  swapEnabled: true,
  protocolYieldFeeCache: '0',
  protocolSwapFeeCache: '0',
  owner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  factory: '0x997252b17f61ffc6ca2fddd7fa1cb0cdb98f202d',
  symbol: '50BO-50cUSD',
  tokens: [
    {
      id: '0x865fa2412041bcf28a804bcbd220724bd35cb33a000200000000000000000003-0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11',
      symbol: 'BO',
      name: 'Bob',
      decimals: 18,
      address: '0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11',
      balance: '762013.6209934752584',
      managedBalance: '0',
      weight: '0.5',
      priceRate: '1',
      isExemptFromYieldProtocolFee: true,
      token: { pool: null },
    },
    {
      id: '0x865fa2412041bcf28a804bcbd220724bd35cb33a000200000000000000000003-0x4a4ac35b50daf081c22856ebb26561f3a22598c6',
      symbol: 'cUSD',
      name: 'Celo Dollar',
      decimals: 18,
      address: '0x4a4ac35b50daf081c22856ebb26561f3a22598c6',
      balance: '42000',
      managedBalance: '0',
      weight: '0.5',
      priceRate: '1',
      isExemptFromYieldProtocolFee: true,
      token: { pool: null },
    },
  ],
  tokensList: [
    '0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11',
    '0x4a4ac35b50daf081c22856ebb26561f3a22598c6',
  ],
  tokenAddresses: [
    '0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11',
    '0x4a4ac35b50daf081c22856ebb26561f3a22598c6',
  ],
  totalLiquidity: '0',
  totalShares: '357770.876399959195751382',
  totalSwapFee: '0',
  totalSwapVolume: '0',
  priceRateProviders: [
    {
      address: '0x0000000000000000000000000000000000000000',
      token: { address: '0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11' },
    },
    {
      address: '0x0000000000000000000000000000000000000000',
      token: { address: '0x4a4ac35b50daf081c22856ebb26561f3a22598c6' },
    },
  ],
  createTime: 1702930701,
  totalWeight: '1',
  lowerTarget: '0',
  upperTarget: '0',
  isInRecoveryMode: false,
  isPaused: false,
  isNew: true,
  onchain: {
    tokens: {
      '0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11': {
        decimals: 18,
        balance: '762013.6209934752584',
        weight: 0.5,
        symbol: 'BO',
        name: 'Bob',
      },
      '0x4a4ac35b50daf081c22856ebb26561f3a22598c6': {
        decimals: 18,
        balance: '42000.0',
        weight: 0.5,
        symbol: 'cUSD',
        name: 'Cello Dollar',
      },
    },
    amp: '0',
    swapEnabled: true,
    totalSupply: '357770.876399959195751382',
    decimals: 18,
    swapFee: '0.003',
  },
  feesSnapshot: '0',
  volumeSnapshot: '0',
  apr: {
    swapFees: 0,
    tokenAprs: { total: 0, breakdown: {} },
    stakingApr: { min: 0, max: 0 },
    rewardAprs: { total: 0, breakdown: {} },
    protocolApr: 0,
    min: 0,
    max: 0,
  },
};

const { pools, tokenPrices } = sdk.data;
async function main() {
  const pool = await pools.find(refiPool.id);
  console.log(pool);
  console.log(
    await tokenPrices.find('0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11')
  );
}

main();

// async function main() {
//   const POOL_ID1 =
//     '0x2d011adf89f0576c9b722c28269fcb5d50c2d17900020000000000000000024d';
//   const POOL_ID2 =
//     '0x4aa462d59361fc0115b3ab7e447627534a8642ae000100000000000000000158';
//   const POOL_IDs = [POOL_ID1, POOL_ID2];

//   let result;

//   result = await pools.find(POOL_ID1);
//   console.log('Fetch pool by id', result);

//   result = await pools.all();
//   console.log('Fetch all pools', result);

//   result = await pools.where((pool) => POOL_IDs.includes(pool.id));
//   console.log('Filter pools by attributes', result);

//   // Refetch on-chain balances for a given pool
//   const pool = await pools.find(POOL_ID1);
//   if (!pool) {
//     throw new Error('Pool not found');
//   }
//   for (const idx in pool.tokens) {
//     pool.tokens[idx].balance = '0';
//   }
//   const onchain = await poolsOnChain.refresh(pool);
//   console.log('onchain pool', onchain);
// }

// main();

// yarn example ./examples/data/alfajores.ts
