// @ts-nocheck

import { useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { useEffect, useState } from "react";

export async function checkWallet() {
  const [ownerAddress, setOwnerAddress] = useState("");
  const wallet = useEmbeddedWallet();
  const { isReady, user, logout } = usePrivy();

  useEffect(() => {
    checkWalletAddress();
  }, [wallet]);

  async function checkWalletAddress() {
    try {
      if (!wallet || wallet.status !== "connected") return;
      await wallet.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "8453" }],
      });
      const accounts = await wallet.provider.request({
        method: "eth_requestAccounts",
      });
      setOwnerAddress(accounts[0]);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  try {
    if (!wallet || wallet.status !== "connected") return;
    await wallet.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "8453" }],
    });
    const accounts = await wallet.provider.request({
      method: "eth_requestAccounts",
    });
    setOwnerAddress(accounts[0]);
  } catch (error) {
    console.log("error: ", error);
  }
  return ownerAddress;
}
