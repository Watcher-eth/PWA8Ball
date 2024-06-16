import { ethers } from "ethers";
import { BLITZ_CONTEST_ABI } from "../utils/abis/Blitz_Contest.js"; // replace with your actual config

export const getVotersForSubmission = async (
  submissionAddress: string,
  contestAddress: string
) => {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_URL");
  const contract = new ethers.Contract(
    contestAddress,
    BLITZ_CONTEST_ABI,
    provider
  );

  return await contract.submissionToVoters(submissionAddress);
};

// Takes in a voter and a submission and returns ammounts of votes which that voter owns
export const getVotesForVoter = async (
  submissionAddress: string,
  voterAddress: string,
  contestAddress: string
) => {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_URL");
  const contract = new ethers.Contract(
    contestAddress,
    BLITZ_CONTEST_ABI,
    provider
  );

  return await contract.votersForWinner(submissionAddress, voterAddress);
};

import { useQuery } from "@tanstack/react-query";

// Returns all voters for a given submission and how many votes they own
export function useVotersData(
  submissionAddress: string,
  contestAddress: string
) {
  return useQuery(["votersData", submissionAddress], async () => {
    const voterAddresses = await getVotersForSubmission(
      submissionAddress,
      contestAddress
    );
    const votersDataPromises = voterAddresses.map(async (voter) => {
      const votes = await getVotesForVoter(
        submissionAddress,
        voter,
        contestAddress
      );
      return { voter, votes: votes.toString() };
    });

    return Promise.all(votersDataPromises);
  });
}
