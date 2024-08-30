// @ts-nocheck

import React, { useState, useEffect, useContext } from "react";
import {
  type Address,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
} from "viem";
import { baseSepolia } from "viem/chains";
import {
  type SmartAccountClient,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { USDC_ABI } from "./contracts/Usdc";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { useUserStore } from "@/lib/stores/UserStore";
import { getWalletClient } from "@wagmi/core";
import { wagmiConfig } from "@/pages/_app";
import {
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  BASE_SEPOLIA_USDC_ADDRESS,
} from "@/constants/onchain";

export const SMART_ACCOUNT_FACTORY_ADDRESS =
  "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985";
export const BASE_GOERLI_ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

/** Interface returned by custom `useSmartAccount` hook */
interface SmartAccountInterface {
  /** Privy embedded wallet, used as a signer for the smart account */
  eoa?: ConnectedWallet;
  /** Smart account client to send signature/transaction requests to the smart account */
  smartAccountClient?: SmartAccountClient;
  /** EOA client for regular EOAs */
  eoaClient?: any;
  /** Smart account address */
  smartAccountAddress?: Address;
  /** Boolean to indicate whether the smart account state has initialized */
  smartAccountReady: boolean;
  eoaAddress?: Address;
}

const SmartAccountContext = React.createContext<SmartAccountInterface>({
  eoa: undefined,
  smartAccountClient: undefined,
  eoaClient: undefined,
  smartAccountAddress: undefined,
  smartAccountReady: false,
  eoaAddress: undefined,
});

export const SmartAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { wallets } = useWallets();
  const { address: eoaAddress, isConnected } = useAccount();
  const { user } = useUserStore();
  const { walletType } = user || {};
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  // States to store the smart account and its status
  const [eoa, setEoa] = useState<ConnectedWallet | undefined>();
  const [smartAccountClient, setSmartAccountClient] = useState<
    SmartAccountClient | undefined
  >();
  const [eoaClient, setEoaClient] = useState<any | undefined>();
  const [smartAccountAddress, setSmartAccountAddress] = useState<Address>();
  const [smartAccountReady, setSmartAccountReady] = useState(false);

  async function createSmartWallet(eoa: ConnectedWallet) {
    // Creates a smart account given a Privy `ConnectedWallet` object representing
    // the  user's EOA.
    const eip1193provider = await embeddedWallet.getEthereumProvider();

    setEoa(eoa);
    // Get an EIP1193 provider and viem WalletClient for the EOA
    const privyClient = createWalletClient({
      account: embeddedWallet?.address,
      chain: baseSepolia,
      transport: custom(eip1193provider),
    });

    const customSigner = walletClientToSmartAccountSigner(privyClient);

    const publicClient = createPublicClient({
      chain: baseSepolia, // Replace this with the chain of your app
      transport: http(),
    });

    const simpleSmartAccount = await signerToSimpleSmartAccount(publicClient, {
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      signer: customSigner,
      factoryAddress: SMART_ACCOUNT_FACTORY_ADDRESS,
    });

    console.log(
      "Step 1",
      simpleSmartAccount,
      process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL
    );

    const pimlicoPaymaster = createPimlicoPaymasterClient({
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
    });

    const pimlicoBundlerClient = createPimlicoBundlerClient({
      transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
    console.log("Step 2", pimlicoPaymaster);

    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccount,
      bundlerTransport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
      middleware: {
        sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation, // optional
        gasPrice: async () =>
          (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // if using pimlico bundler
      },

      chain: baseSepolia, // Replace this with the chain for your app
    });
    console.log("Step 2.5", smartAccountClient);
    const account = smartAccountClient.account?.address;
    console.log("Step 3", account);

    setSmartAccountClient(smartAccountClient);
    setSmartAccountAddress(account);
    setSmartAccountReady(true);

    const allowance = await publicClient.readContract({
      address: BASE_SEPOLIA_USDC_ADDRESS,
      abi: USDC_ABI,
      args: [account, BASE_SEPOLIA_EIGHTBALL_ADDRESS],
      functionName: "allowance",
    });

    if (allowance < 1n) {
      console.log("allowance", allowance);
      try {
        const contract = getContract({
          abi: USDC_ABI,
          address: BASE_SEPOLIA_USDC_ADDRESS,
          client: { public: rpcClient, wallet: smartAccountClient },
        });


        const hash = await contract.write.approve([
          BASE_SEPOLIA_EIGHTBALL_ADDRESS,
          10000000000n,
        ]);
      } catch (error) {
        console.error("Failed to send transaction:", error);
        throw error;
      }
    }

    setSmartAccountClient(smartAccountClient);
    setSmartAccountAddress(account);
    setSmartAccountReady(true);
  }

  async function createEOAWallet() {
    const walletClient = await getWalletClient(wagmiConfig, {
      account: eoaAddress,
      chain: baseSepolia,
    });


    setEoaClient(walletClient);
    setEoa(eoaAddress);
    setSmartAccountAddress(eoaAddress);
    setSmartAccountReady(true);
  }

  useEffect(() => {
    if (walletType === "smartwallet" && embeddedWallet) {
      createSmartWallet(embeddedWallet);
    } else if (walletType === "eoa" && isConnected && eoaAddress) {
      try {
        createEOAWallet();
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    walletType,
    smartAccountAddress,
    embeddedWallet?.address,
    embeddedWallet,
    eoaAddress,
    isConnected,
  ]);

  return (
    <SmartAccountContext.Provider
      value={{
        smartAccountReady,
        smartAccountClient,
        smartAccountAddress: smartAccountAddress,
        eoaClient,
        eoaAddress,
        eoa,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  );
};

export const useSmartAccount = () => {
  return useContext(SmartAccountContext);
};
