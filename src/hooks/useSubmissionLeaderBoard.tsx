import { ethers } from "ethers";
import { useQuery } from "wagmi";
import { BLITZ_CONTEST_ABI } from "../utils/abis/Blitz_Contest.js"; // replace with your actual config

// Gets all registered Submissions/Posts
export const getRegisteredSubmissions = async (contestAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_URL");
  const contract = new ethers.Contract(
    contestAddress,
    BLITZ_CONTEST_ABI,
    provider
  );

  return await contract.postAddresses();
};

// Gets all votes for a particular Submissions/Posts
export const getVotesForSubmission = async (
  submissionAddress: string,
  contestAddress: string
) => {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_URL");
  const contract = new ethers.Contract(
    contestAddress,
    BLITZ_CONTEST_ABI,
    provider
  );

  return await contract.votesReceived(submissionAddress);
};

// Takes in contest and returns a list of submission sorted by votes
export function useSubmissionsVotes(contestAddress: string) {
  return useQuery("submissionsVotes", async () => {
    const submissions = await getRegisteredSubmissions(contestAddress);
    const votesPromises = submissions.map(async (submission) => {
      const votes = await getVotesForSubmission(submission, contestAddress);
      return { submissionAddress: submission, totalVotes: votes.toNumber() };
    });

    const submissionsVotes = await Promise.all(votesPromises);
    return submissionsVotes.sort((a, b) => b.totalVotes - a.totalVotes);
  });
}
