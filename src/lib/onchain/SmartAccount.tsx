import React, { useState, useEffect, useContext } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  getContract,
  http,
  parseAbiItem,
} from "viem";
import { baseGoerli, baseSepolia } from "viem/chains";
import {
  walletClientToCustomSigner,
  type SmartAccountClient,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
  ENTRYPOINT_ADDRESS_V06,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import {
  EmbeddedWallet,
  EmbeddedWalletState,
  User,
  getUserEmbeddedWallet,
  useEmbeddedWallet,
} from "@privy-io/expo";
import { UsdcABI } from "./contracts/Usdc";
import { EightBallAddress } from "./contracts/Eightball";
import { rpcClient } from "./Viem";
export const SMART_ACCOUNT_FACTORY_ADDRESS =
  "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985";
export const BASE_GOERLI_ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

/** Interface returned by custom `useSmartAccount` hook */
interface SmartAccountInterface {
  /** Privy embedded wallet, used as a signer for the smart account */
  eoa: EmbeddedWalletState | undefined;
  /** Smart account client to send signature/transaction requests to the smart account */
  smartAccountClient: SmartAccountClient | undefined;
  /** Smart account address */
  smartAccountAddress: `0x${string}` | undefined;
  /** Boolean to indicate whether the smart account state has initialized */
  smartAccountReady: boolean;
}

const SmartAccountContext = React.createContext<SmartAccountInterface>({
  eoa: undefined,
  smartAccountClient: undefined,
  smartAccountAddress: undefined,
  smartAccountReady: false,
});

export const useSmartAccount = () => {
  return useContext(SmartAccountContext);
};

export const SmartAccountProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  const wallet = useEmbeddedWallet();
  const account = getUserEmbeddedWallet(user);

  // Get a list of all of the wallets (EOAs) the user has connected to your site
  // Find the embedded wallet by finding the entry in the list with a `walletClientType` of 'privy'
  const embeddedWallet = account;

  // States to store the smart account and its status
  const [eoa, setEoa] = useState<EmbeddedWalletState | undefined>();
  const [smartAccountClient, setSmartAccountClient] = useState<
    SmartAccountClient | undefined
  >();
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | undefined
  >();
  const [smartAccountReady, setSmartAccountReady] = useState(false);

  useEffect(() => {
    // Creates a smart account given a Privy `ConnectedWallet` object representing
    // the  user's EOA.
    const createSmartWallet = async (eoa: EmbeddedWalletState) => {
      setEoa(eoa);
      // Get an EIP1193 provider and viem WalletClient for the EOA
      const privyClient = createWalletClient({
        account: embeddedWallet?.address as `0x${string}`,
        chain: baseSepolia,
        transport: custom(wallet.provider),
      });
      console.log("Step 0", privyClient);

      const customSigner = walletClientToSmartAccountSigner(privyClient);

      const publicClient = createPublicClient({
        chain: baseSepolia, // Replace this with the chain of your app
        transport: http(),
      });

      const simpleSmartAccount = await signerToSimpleSmartAccount(
        publicClient,
        {
          entryPoint: ENTRYPOINT_ADDRESS_V07,
          signer: customSigner,
          factoryAddress: SMART_ACCOUNT_FACTORY_ADDRESS,
        }
      );

      console.log(
        "Step 1",
        simpleSmartAccount,
        process.env.EXPO_PUBLIC_PIMLICO_PAYMASTER_URL
      );

      const pimlicoPaymaster = createPimlicoPaymasterClient({
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        transport: http(process.env.EXPO_PUBLIC_PIMLICO_PAYMASTER_URL),
      });

      const pimlicoBundlerClient = createPimlicoBundlerClient({
        transport: http(process.env.EXPO_PUBLIC_PIMLICO_PAYMASTER_URL),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
      });
      console.log("Step 2", pimlicoPaymaster);

      const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccount,
        bundlerTransport: http(process.env.EXPO_PUBLIC_PIMLICO_PAYMASTER_URL),
        middleware: {
          sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation, // optional
          gasPrice: async () =>
            (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // if using pimlico bundler
        },

        chain: baseSepolia, // Replace this with the chain for your app
      });
      console.log("Step 2.5", smartAccountClient);

      const smartAccountAddress = smartAccountClient.account?.address;
      const account = smartAccountClient.account?.address;
      console.log("Step 3", smartAccountAddress);
      const gas = (await pimlicoBundlerClient.getUserOperationGasPrice()).fast;
      const allowance = await publicClient.readContract({
        address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        abi: UsdcABI,
        args: [account, EightBallAddress],
        functionName: "allowance",
      });

      if (allowance < BigInt(1)) {
        console.log("allowance", allowance);
        try {
          const contract = getContract({
            abi: UsdcABI,
            address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            client: { public: rpcClient, wallet: smartAccountClient },
          });

          console.log("contract", contract);

          const hash = await contract.write.approve([
            EightBallAddress,
            BigInt(10000000000),
          ]);
          console.log("hash", hash);
        } catch (error) {
          console.error("Failed to send transaction:", error);
          throw error;
        }
      }

      setSmartAccountClient(smartAccountClient);
      setSmartAccountAddress(smartAccountAddress);
      setSmartAccountReady(true);
    };

    if (embeddedWallet) createSmartWallet(embeddedWallet);
  }, [embeddedWallet?.address, wallet]);

  return (
    <SmartAccountContext.Provider
      value={{
        smartAccountReady: smartAccountReady,
        smartAccountClient: smartAccountClient,
        smartAccountAddress: smartAccountAddress,
        eoa: eoa,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  );
};
