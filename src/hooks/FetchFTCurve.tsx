import { ethers } from "ethers";
import { FT_CURVE_ABI } from "../utils/abis/FT_CURVE"; // replace with your actual config
import { useQuery } from "@tanstack/react-query";

const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_URL");

const contract = new ethers.Contract(contractAddress, FT_CURVE_ABI, provider);

export const getSharesBalance = async (subject, account) => {
  return await contract.getSharesBalance(subject, account);
};

export const getBuyPriceAfterFee = async (sharesSubject, amount) => {
  return await contract.getBuyPriceAfterFee(sharesSubject, amount);
};

export const getSellPriceAfterFee = async (sharesSubject, amount) => {
  return await contract.getSellPriceAfterFee(sharesSubject, amount);
};

export function useFriendtechSharesData(subject, account, amount) {
  const sharesBalanceQuery = useQuery(["sharesBalance", subject, account], () =>
    getSharesBalance(subject, account)
  );
  const buyPriceQuery = useQuery(["buyPrice", subject, amount], () =>
    getBuyPriceAfterFee(subject, amount)
  );
  const sellPriceQuery = useQuery(["sellPrice", subject, amount], () =>
    getSellPriceAfterFee(subject, amount)
  );

  // Combine the data and status from all queries
  return {
    data: {
      sharesBalance: sharesBalanceQuery.data,
      buyPrice: buyPriceQuery.data,
      sellPrice: sellPriceQuery.data,
    },
    isLoading:
      sharesBalanceQuery.isLoading ||
      buyPriceQuery.isLoading ||
      sellPriceQuery.isLoading,
    error:
      sharesBalanceQuery.error || buyPriceQuery.error || sellPriceQuery.error,
  };
}
