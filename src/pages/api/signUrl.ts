import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { urlForSignature } = req.body;

  if (!urlForSignature) {
    return res.status(400).json({ error: "urlForSignature is required" });
  }

  const secret = "pk_test_1e58TqyEMfB8v3fPzA9c8HKwbrxj5nr";

  if (!secret) {
    return res
      .status(500)
      .json({ error: "API key is missing from environment variables" });
  }

  const signature = crypto
    .createHmac("sha256", secret)
    .update(urlForSignature)
    .digest("base64");

  res.status(200).json({ signature });
}
