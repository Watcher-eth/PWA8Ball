// @ts-nocheck

import { lensClient } from "@/pages/_app";
import { TypedDataDomain, createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";

//TODO: ADD API ROUTE TO DB
export async function EnableProfileManager(profile, Signer) {
  if (profile?.signless === true) {
    console.log("Profile manager is enabled");
  } else {
    const signer = Signer;
    console.log("Signer", signer);
    try {
      const typedDataResult =
        await lensClient.profile.createChangeProfileManagersTypedData({
          approveSignless: true,
        });

      const { id, typedData } = typedDataResult.unwrap();

      const client = createWalletClient({
        chain: polygon,
        transport: custom(window.ethereum),
      });
      const addy = profile?.ownedBy?.address;

      // sign with the wallet
      const typedDomain = typedData.domain;
      const domain: TypedDataDomain = {
        name: typedDomain.name,
        version: typedDomain.version,
        chainId: typedDomain.chainId,
        verifyingContract: `0x${typedDomain.verifyingContract.substring(2)}`,
      };

      const signedTypedData = await signer._signTypedData(typedData);

      // broadcast onchain
      const broadcastOnchainResult =
        await lensClient.transaction.broadcastOnchain({
          id,
          signature: signedTypedData,
        });

      const onchainRelayResult = broadcastOnchainResult.unwrap();

      if (onchainRelayResult.__typename === "RelayError") {
        console.log(`Something went wrong`, onchainRelayResult);
        return;
      }
      console.log(
        `Successfully changed profile managers with transaction with id ${onchainRelayResult}, txHash: ${onchainRelayResult.txHash}`
      );
    } catch (error) {
      console.log("error with enablinh profile manager", error);
    }
  }
}
