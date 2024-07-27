import { ImageResponse } from "@vercel/og";

import { IUser } from "@/supabase/types";
import { SUPABASE_CLIENT } from "@/supabase/supabaseClient";
import { aeonikFontDataPromise } from "@/utils/fonts";
import { generateChartSVG } from "@/components/common/Charts/OGImageSVGChart";

export const runtime = "edge";

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id")?.slice(0, 100));
    const fontData = await aeonikFontDataPromise;

    const market = await fetchMarketAndPricesById(id);
    const prices = market.prices;

    //TODO: Need to check svg generation works correctly and gets displayed correctly
    const chartSVG = generateChartSVG({ prices });

    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "16px",
            backgroundColor: "#070707",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 5,
            }}
          >
            <div
              style={{
                padding: "2px 5px",
                borderRadius: 10,
                border: "2px solid white",
                fontSize: 17,
                color: "white",
              }}
            >
              {market.market.topic}
            </div>
            <div
              style={{
                fontSize: 23,
                color: "white",
                fontWeight: "700",
              }}
            >
              {market.market.optionA.odds / 100}%
            </div>
          </div>
          <div
            style={{
              fontSize: 23,
              color: "white",
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            {market.market.question}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: chartSVG }}
            style={{ width: "1200px", height: "630px" }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "AeonikBold", data: fontData, style: "normal" }],
      }
    );
  } catch (e) {
    return new Response("Failed to generate Market OG Image", { status: 500 });
  }
}

async function fetchMarketAndPricesById(marketId: number): Promise<any | null> {
  const { data, error } = await SUPABASE_CLIENT.rpc("get_market_with_details", {
    market_id: marketId,
    user_external_auth_id: "did:privy:clwsvnoij0de59b0ly1k7rvad",
  });

  let startTime = new Date();
  startTime.setMonth(startTime.getMonth() - 1);
  const startTimestamp = Math.floor(startTime.getTime() / 1000); // convert milliseconds to seconds

  const { data: PriceData, error: PriceError } = await SUPABASE_CLIENT.from(
    "Price"
  )
    .select("*")
    .eq("marketId", marketId)
    .gte("timestamp", startTimestamp)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("Fetch User By External Auth ID Error:", error.message);
    throw new Error(error.message);
  }
  const marketAndPrice = { market: data, prices: PriceData };
  return marketAndPrice;
}
