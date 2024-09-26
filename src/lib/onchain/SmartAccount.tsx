import React, { useState, useEffect, useContext } from "react"

import {
  type Address,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
  WalletClient,
} from "viem"
import { baseSepolia } from "viem/chains"
import {
  type SmartAccountClient,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless"
import {
  biconomySmartAccount,
  kernelSmartAccount,
  simpleSmartAccount,
} from "@permissionless/wagmi"
import { signerToSimpleSmartAccount } from "permissionless/accounts"
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico"
import { USDC_ABI } from "./contracts/Usdc"
import { rpcClient } from "@/lib/onchain/rpcClient"
import {
  ConnectedWallet,
  EIP1193Provider,
  useConnectWallet,
  useCreateWallet,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth"
import {
  type CreateConnectorFn,
  useAccount,
  useConfig,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useClient,
  useWalletClient,
} from "wagmi"
import { useUserStore } from "@/lib/stores/UserStore"

import {
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  BASE_SEPOLIA_USDC_ADDRESS,
} from "@/constants/onchain"
import { getWalletClient } from "@wagmi/core"
import { wagmiConfig } from "@/wagmiConfig"

export const SMART_ACCOUNT_FACTORY_ADDRESS =
  "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985"
export const BASE_GOERLI_ENTRYPOINT_ADDRESS =
  "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
/** Interface returned by custom `useSmartAccount` hook */
// <{
//   /** Smart account client to send signature/transaction requests to the smart account */
//   smartAccountClient?: SmartAccountClient<never>
//   /** Smart account address */
//   smartAccountAddress?: Address
//   /** Boolean to indicate whether the smart account state has initialized */
//   smartAccountReady: boolean
// }>
const SmartAccountContext = React.createContext({
  smartAccountClient: undefined,
  smartAccountAddress: undefined,
  smartAccountReady: false,
})

export function SmartAccountProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // const { connectWallet } = useConnectWallet();
  // const { connectWallet } = usePrivy();
  const config = useConfig()
  const { connectors, connect, status, error } = useConnect()
  const { createWallet } = usePrivy()

  const { ready, wallets } = useWallets()
  const { isConnected, address: accountAddress } = useAccount()
  const { user } = useUserStore()
  const { user: privyUser, ready: userReady, authenticated } = usePrivy()
  const { walletType } = user || {}
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  )


  console.log("accountAddress", accountAddress)
  console.log("ready1", ready)
  console.log("wallets1", wallets)
  console.log("embeddedWallet1", embeddedWallet)
  console.log("privyUser", privyUser)
  // States to store the smart account and its status
  // const [smartAccountClient, setSmartAccountClient] = useState()
  // const [smartAccountAddress, setSmartAccountAddress] = useState<Address>()
  const [smartAccountReady, setSmartAccountReady] = useState(false)

  const address = privyUser?.wallet?.address
  const {data: client} = useWalletClient(
    {
    // account: address as Address,
    chainId: baseSepolia.id,
  }
)

  // const { address } = useAccount()
  const smartAccountClient = client
  const smartAccountAddress = address
  console.log("smartAccount", {smartAccountClient, smartAccountAddress})

  async function connectSmartAccount() {
    // if (!ready) {
    //   return
    // }
    console.log("connecting smart account")
    const publicClient = createPublicClient({
      chain: baseSepolia, // Replace this with the chain of your app
      transport: http(),
    })
    console.log("publicClient", publicClient)
    const eip1193provider = await embeddedWallet?.getEthereumProvider()
    // const walletClient = await getWalletClient(config)
    console.log("eip1193provider", eip1193provider)
    const privyClient = createWalletClient({
      account: embeddedWallet?.address as Address,
      chain: baseSepolia,
      // transport: http(),
      transport: custom(eip1193provider as EIP1193Provider),
    })
    console.log("privyClient", privyClient)

    // const walletClient = await getWalletClient(wagmiConfig)
    //   , {
    //   chainId: baseSepolia.id,
    //   account: embeddedWallet?.address as Address,
    // })

    // console.log("walletClient", walletClient)
    console.log("privyClient", privyClient)

    const customSigner = walletClientToSmartAccountSigner(privyClient)

    console.log({ embeddedWallet, customSigner, privyClient })
    // if (!publicClient) {
    //   throw new Error("publicClient not found")
    // }

    const pimlicoClient = createPimlicoPaymasterClient({
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
    })

    const connector = await simpleSmartAccount({
      publicClient,
      bundlerTransport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
      signer: customSigner,
      factoryAddress: SMART_ACCOUNT_FACTORY_ADDRESS,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      sponsorUserOperation: pimlicoClient.sponsorUserOperation,
    })
    console.log({ connector })
    connect({
      connector,
      chainId: baseSepolia.id
    }, {
      onSuccess: (...successArgs) => {
        console.log("successArgs", successArgs)
      },
      onError: (...errorArgs) => {
        console.log("errorArgs", errorArgs)
      },
      onSettled: (...settleArgs) => {
        console.log("settleArgs", settleArgs)
      },
    })
    /** Lets see if prev autoapproval works */
    const allowance = await publicClient.readContract({
      address: BASE_SEPOLIA_USDC_ADDRESS,
      abi: USDC_ABI,
      args: [privyClient.account.address, BASE_SEPOLIA_EIGHTBALL_ADDRESS],
      functionName: "allowance",
    })
    if (allowance < 1n) {
      console.log("allowance", allowance)
      try {
        const contract = getContract({
          abi: USDC_ABI,
          address: BASE_SEPOLIA_USDC_ADDRESS,
          client: { public: rpcClient, wallet: privyClient },
        })
        const hash = await contract.write.approve([
          BASE_SEPOLIA_EIGHTBALL_ADDRESS,
          10000000000n,
        ])
        console.log("hash", hash)
      } catch (error) {
        console.error("Failed to send transaction:", error)
        // throw error
      }
    }
    setSmartAccountReady(true)
  }

  useEffect(() => {
    if (!embeddedWallet && userReady && authenticated) {
        createWallet().then((wallet) => {
          console.log("createdwallet", wallet)
          console.log("successfully created wallet")
        }).catch((error) => {
          console.error("Failed to create wallet:", error)
        })
      // createWallet()
      // console.log("Creating embedded  wallet")
    }
    console.log("walletType", walletType)
    // if (walletType === "smartwallet" && embeddedWallet) {
    // createSmartWallet()
    console.log("connecting smart account")
    connectSmartAccount()
      .then(() => {
        console.log("connected smart account")
      })
      .catch((error) => {
        console.error("Failed to connect smart account:", error)
      })
    // }
  }, [
    walletType,
    smartAccountAddress,
    // embeddedWallet?.address,
    // embeddedWallet,
    isConnected,
    userReady,
    authenticated
    // smartAccountClient,
  ])

  return (
    <SmartAccountContext.Provider
      value={{
        smartAccountReady,
        smartAccountClient,
        smartAccountAddress,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  )
}

  // async function createSmartWallet() {
  //   // Creates a smart account given a Privy `ConnectedWallet` object representing
  //   // the  user's EOA.
  //   const eip1193provider = await embeddedWallet?.getEthereumProvider()

  //   // Get an EIP1193 provider and viem WalletClient for the EOA
  //   const privyClient = createWalletClient({
  //     account: embeddedWallet?.address as Address,
  //     chain: baseSepolia,
  //     transport: custom(eip1193provider as EIP1193Provider),
  //   })

  //   const customSigner = walletClientToSmartAccountSigner(privyClient)

  //   const publicClient = createPublicClient({
  //     chain: baseSepolia, // Replace this with the chain of your app
  //     transport: http(),
  //   })

  //   const mySimpleSmartAccount = await signerToSimpleSmartAccount(publicClient, {
  //     entryPoint: ENTRYPOINT_ADDRESS_V07,
  //     signer: customSigner,
  //     factoryAddress: SMART_ACCOUNT_FACTORY_ADDRESS,
  //   })

  //   console.log(
  //     "Step 1",
  //     mySimpleSmartAccount,
  //     process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL
  //   )

  //   const pimlicoPaymaster = createPimlicoPaymasterClient({
  //     entryPoint: ENTRYPOINT_ADDRESS_V07,
  //     transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
  //   })

  //   const pimlicoBundlerClient = createPimlicoBundlerClient({
  //     transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
  //     entryPoint: ENTRYPOINT_ADDRESS_V07,
  //   })
  //   console.log("Step 2", pimlicoPaymaster)

  //   const smartAccountClient: WalletClient = createSmartAccountClient({
  //     account: mySimpleSmartAccount,
  //     bundlerTransport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
  //     middleware: {
  //       sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation, // optional
  //       gasPrice: async () =>
  //         (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // if using pimlico bundler
  //     },

  //     chain: baseSepolia, // Replace this with the chain for your app
  //   })
  //   console.log("Step 2.5", smartAccountClient)
  //   const account = smartAccountClient.account?.address
  //   console.log("Step 3", account)

  //   setSmartAccountClient(smartAccountClient)
  //   setSmartAccountAddress(account)
  //   setSmartAccountReady(true)

  //   const allowance = await publicClient.readContract({
  //     address: BASE_SEPOLIA_USDC_ADDRESS,
  //     abi: USDC_ABI,
  //     args: [account, BASE_SEPOLIA_EIGHTBALL_ADDRESS],
  //     functionName: "allowance",
  //   })

  //   if (allowance < 1n) {
  //     console.log("allowance", allowance)
  //     try {
  //       const contract = getContract({
  //         abi: USDC_ABI,
  //         address: BASE_SEPOLIA_USDC_ADDRESS,
  //         client: { public: rpcClient, wallet: smartAccountClient },
  //       })

  //       const hash = await contract.write.approve([
  //         BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  //         10000000000n,
  //       ])
  //     } catch (error) {
  //       console.error("Failed to send transaction:", error)
  //       throw error
  //     }
  //   }

  //   setSmartAccountClient(smartAccountClient)
  //   setSmartAccountAddress(account)
  //   setSmartAccountReady(true)
  // }

export const useSmartAccount = () => {
  return useContext(SmartAccountContext)
}

