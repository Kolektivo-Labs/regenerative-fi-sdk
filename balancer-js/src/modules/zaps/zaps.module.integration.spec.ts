import dotenv from 'dotenv';
import { expect } from 'chai';
import { BalancerSDK, BalancerSdkConfig, Network, Relayer } from '@/.';
import hardhat from 'hardhat';

import { BigNumber, parseFixed } from '@ethersproject/bignumber';

import { forkSetup } from '@/test/lib/utils';
import { Zaps } from './zaps.module';

/*
 * Testing on GOERLI
 *
 * Run goerli node using the following terminal command line:
 * npx hardhat node --fork [GOERLI_ALCHEMY_URL]
 *
 * Change `network` to Network.GOERLI
 */

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl } = process.env;
const { ethers } = hardhat;

let balancer: BalancerSDK;
const network = Network.GOERLI;
const rpcUrl = 'http://127.0.0.1:8545';
const sdkConfig: BalancerSdkConfig = {
  network,
  rpcUrl,
};
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, network);
const signer = provider.getSigner();

const gaugeSlots = [1]; // Info fetched using npm package slot20

// Goerli
const gaugeAddresses = ['0xf0f572ad66baacDd07d8c7ea3e0E5EFA56a76081']; // Balancer B-50WBTC-50WETH Gauge Deposit
// Mainnet
// const gaugeAddresses = ['0x68d019f64a7aa97e2d4e7363aee42251d08124fb']; // Balancer bb-a-USD Gauge Deposit

const initialBalance = '1000';
let signerAddress: string;

// Setup

const tokenBalance = async (tokenAddress: string) => {
  const balance: Promise<BigNumber> = balancer.contracts
    .ERC20(tokenAddress, signer.provider)
    .balanceOf(signerAddress);
  return balance;
};

const updateBalances = async (addresses: string[]) => {
  const balances = [];
  for (let i = 0; i < addresses.length; i++) {
    balances[i] = tokenBalance(addresses[i]);
  }
  return Promise.all(balances);
};

// Test Scenarios

describe('zaps execution', async () => {
  before(async function () {
    this.timeout(20000);
    balancer = new BalancerSDK(sdkConfig);

    const isVyperMapping = true; // required for gauge tokens
    await forkSetup(
      balancer,
      signer,
      gaugeAddresses,
      gaugeSlots,
      [parseFixed(initialBalance, 18).toString()],
      jsonRpcUrl as string,
      isVyperMapping
    );
    signerAddress = await signer.getAddress();
  });

  it('should update balances', async () => {
    const balances = await updateBalances(gaugeAddresses);
    for (let i = 0; i < balances.length; i++) {
      expect(balances[i].eq(parseFixed(initialBalance, 18))).to.be.true;
    }
  });
}).timeout(20000);