import axios from 'axios';
import { MaxInt256 } from '@ethersproject/constants';
import { networkAddresses } from '@/lib/constants/config';
import { BalancerTenderlyConfig } from '@/types';

type StateOverrides = {
  [address: string]: { value: { [key: string]: string } };
};

export default class TenderlyHelper {
  private vaultAddress;
  private tenderlyUrl;
  private opts;

  constructor(private chainId: number, tenderlyConfig: BalancerTenderlyConfig) {
    const { contracts } = networkAddresses(this.chainId);
    this.vaultAddress = contracts.vault as string;
    this.tenderlyUrl = `https://api.tenderly.co/api/v1/account/${tenderlyConfig.user}/project/${tenderlyConfig.project}/`;
    this.opts = {
      headers: {
        'X-Access-Key': tenderlyConfig.accessKey,
      },
    };
  }

  simulateTransaction = async (
    to: string,
    data: string,
    userAddress: string,
    tokensIn: string[]
  ): Promise<string> => {
    // Encode token balances and allowances overrides to max value before performing simulation
    const encodedStateOverrides = await this.encodeBalanceAndAllowanceOverrides(
      userAddress,
      tokensIn
    );

    // Map encoded-state response into simulate request body by replacing property names
    const state_objects = Object.fromEntries(
      Object.keys(encodedStateOverrides).map((address) => {
        // Object.fromEntries require format [key, value] instead of {key: value}
        return [address, { storage: encodedStateOverrides[address].value }];
      })
    );

    const body = {
      // -- Standard TX fields --
      network_id: this.chainId.toString(),
      from: userAddress,
      to,
      input: data,
      // gas: 8000000,
      // gas_price: '0',
      // value: '0',
      // -- Simulation config (tenderly specific) --
      save_if_fails: true,
      // save: true,
      state_objects,
    };

    const SIMULATE_URL = this.tenderlyUrl + 'simulate';

    const resp = await axios.post(SIMULATE_URL, body, this.opts);

    const simulatedTransactionOutput =
      resp.data.transaction.transaction_info.call_trace.output;

    return simulatedTransactionOutput;
  };

  private encodeBalanceAndAllowanceOverrides = async (
    userAddress: string,
    tokens: string[]
  ): Promise<StateOverrides> => {
    if (tokens.length === 0) return {};

    // Create balances and allowances overrides for each token address provided
    let stateOverrides: StateOverrides = {};
    tokens.forEach(
      (token) =>
        (stateOverrides = {
          ...stateOverrides,
          [`${token}`]: {
            value: {
              [`_balances[${userAddress}]`]: MaxInt256.toString(),
              [`_allowances[${userAddress}][${this.vaultAddress}]`]:
                MaxInt256.toString(),
              [`balanceOf[${userAddress}]`]: MaxInt256.toString(),
              [`allowance[${userAddress}][${this.vaultAddress}]`]:
                MaxInt256.toString(),
              [`balances[${userAddress}]`]: MaxInt256.toString(),
              [`allowed[${userAddress}][${this.vaultAddress}]`]:
                MaxInt256.toString(),
            },
          },
        })
    );

    const ENCODE_STATES_URL = this.tenderlyUrl + 'contracts/encode-states';
    const body = {
      networkID: this.chainId.toString(),
      stateOverrides,
    };

    const encodedStatesResponse = await axios.post(
      ENCODE_STATES_URL,
      body,
      this.opts
    );
    const encodedStateOverrides = encodedStatesResponse.data
      .stateOverrides as StateOverrides;

    if (
      !encodedStateOverrides ||
      Object.keys(encodedStateOverrides).length !== tokens.length ||
      Object.keys(encodedStateOverrides).some((k) => {
        return Object.keys(encodedStateOverrides[k].value).length !== 2;
      })
    )
      throw new Error(
        "Couldn't encode state overrides - contracts should be verified and whitelisted on Tenderly - states should match the ones in the contracts"
      );

    return encodedStateOverrides;
  };
}
