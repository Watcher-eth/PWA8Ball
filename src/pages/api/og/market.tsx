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
    console.log("Market data: ", market) // Log market data
    console.log("Enhanced Market data: ", enhancedMarket) // Log enhanced market data

    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "54px",
            backgroundColor: "#070707",
            overflow: "hidden",
            display: "flex", // Ensure "display: flex" is set
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Optional: Uncomment the img tag below if needed */}
          <img
            style={{
              position: "absolute",
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
            src={enhancedMarket?.image}
          />

          <div
            style={{
              position: "absolute",
              width: 1200,
              height: 670,
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.8604035364145658) 0%, rgba(0,0,0,0.4458377100840336) 32%, rgba(0,0,0,0.26936712184873945) 57%, rgba(0,0,0,0.1685267857142857) 80%, rgba(0,0,0,0.1) 90%)",
            }}
          />
          <div
            style={{
              fontSize: "5rem",
              color: "white",
              fontFamily: "AeonikBold",
              marginTop: 30,
              display: "flex", // Set display flex
              textAlign: "center",
            }}
          >
            {/* Render the market question or fallback text */}
            {market?.question || "Market Question"}
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              position: "absolute",
              top: 40,
              alignSelf: "center",
              display: "flex", // Set display flex
            }}
          >
            GLIMPSE
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              position: "absolute",
              padding: "10px 25px",
              borderRadius: 40,
              backgroundColor: "rgba(21, 21, 21, 0.8)",
              backdropFilter: "blur(10px)",
              border: "0.5px solid #282828",
              bottom: 40,
              alignSelf: "center",
              display: "flex", // Set display flex
            }}
          >
            {market?.outcomeOddsA != null
              ? `${Number(market.outcomeOddsA) / 100}% Chance`
              : "No Data"}
          </div>
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
