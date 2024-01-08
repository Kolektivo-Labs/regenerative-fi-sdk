import { BalancerSDK } from '@balancer-labs/sdk';

const sdk = new BalancerSDK({
  customSubgraphUrl:
    'https://api.studio.thegraph.com/query/10166/balancer-rfi/version/latest',
  network: 44787,
  rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  sor: {
    tokenPriceService: 'subgraph',
  },
});

const { tokenPrices } = sdk.data;
async function main() {
  console.log(
    await tokenPrices.find('0x1d4c35c3f4a91103ba323fe2f4c3f6ebef531c11')
  );
}

main();

// yarn example ./examples/data/alfajores.ts
