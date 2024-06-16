import { NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const size = {
  width: 1200,
  height: 630,
};
const contentType = "image/png";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Fetch data from Supabase
  const { data } = await supabase
    .from("markets")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    res.status(404).send("Market not found");
    return;
  }

  const image = new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data.title}
      </div>
    ),
    {
      ...size,
    }
  );

  res.setHeader("Content-Type", contentType);
  res.status(200).send(image);
}
