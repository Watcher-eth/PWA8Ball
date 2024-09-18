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
            padding: "54px",
            backgroundColor: "#070707",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
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
              height: 630,
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.8604035364145658) 10%, rgba(0,0,0,0.4458377100840336) 32%, rgba(0,0,0,0.26936712184873945) 57%, rgba(0,0,0,0.1685267857142857) 90%, rgba(0,0,0,0) 92%)",
            }}
          />

          <div
            style={{
              fontSize: "5.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              marginTop: 30,
            }}
          >
            {market?.question}
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              position: "absolute",
              top: 40,
              alignSelf: "center",
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
              padding: "5px 15px",
              borderRadius: 40,
              backgroundColor: "rgba(21, 21, 21, 0.4",
              backdropFilter: "blur(12px)",
              bottom: 40,
              alignSelf: "center",
            }}
          >
            {market?.outcomeOddsA}% Chance
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
