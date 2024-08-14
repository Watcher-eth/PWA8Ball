import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { walletAddress } = req.body;

      const response = await axios.post(
        "https://api.stripe.com/v1/crypto/onramp_sessions",
        `wallet_addresses[ethereum]=${walletAddress}`,
        {
          auth: {
            username: process.env.STRIPE_SECRET_KEY!,
            password: "",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
