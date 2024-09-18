import { ImageResponse } from "@vercel/og"
import { aeonikFontDataPromise } from "@/utils/fonts"
import { getMarketById } from "@/graphql/queries/markets/useGetMarketById"
import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_MARKETS } from "@/constants/markets"
import { HARD_TOPICS } from "@/constants/topics"

export const runtime = "edge"

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")?.slice(0, 100)
    const fontData = await aeonikFontDataPromise

    const market = await getMarketById(id!)
    const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
      market!,
      HARD_MARKETS,
      HARD_TOPICS
    )
    // const prices = market.prices

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
              {enhancedMarket?.topic_title}
            </div>
            <div
              style={{
                fontSize: 23,
                color: "white",
                fontWeight: "700",
              }}
            >
              {market?.outcomeOddsA / 100}%
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
            {market?.question}
          </div>
          {/* <div
            dangerouslySetInnerHTML={{ __html: chartSVG }}
            style={{ width: "1200px", height: "630px" }}
          /> */}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "AeonikBold", data: fontData, style: "normal" }],
      }
    )
  } catch (e) {
    return new Response("Failed to generate Market OG Image", { status: 500 })
  }
}
