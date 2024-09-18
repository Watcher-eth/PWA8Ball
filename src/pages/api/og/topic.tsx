// @ts-nocheck
import { ImageResponse } from "@vercel/og"

import { ITopic, IUser } from "@/supabase/types"

import { SUPABASE_CLIENT } from "@/supabase/supabaseClient"
import { aeonikFontDataPromise, benzinFontDataPromise } from "@/utils/fonts"

export const runtime = "edge"

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")?.slice(0, 100) || "5"
    const [aeonikFontData, benzinFontData] = await Promise.all([
      aeonikFontDataPromise,
      benzinFontDataPromise,
    ])

    const topic = getTopics(id)

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
            style={{ position: "absolute", width: "100%", height: "100%" }}
            src={topic?.image}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.8604035364145658) 0%, rgba(0,0,0,0.4458377100840336) 32%, rgba(0,0,0,0.26936712184873945) 57%, rgba(0,0,0,0.1685267857142857) 98%, rgba(0,0,0,0) 100%)",
            }}
            src={topic?.image}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "30%",
              backdropFilter: "blur(10px)",
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.8604035364145658) 0%, rgba(0,0,0,0.4458377100840336) 32%, rgba(0,0,0,0.26936712184873945) 57%, rgba(0,0,0,0.1685267857142857) 98%, rgba(0,0,0,0) 100%)",
            }}
            src={topic?.image}
          />
          <div
            style={{
              fontSize: "2rem",
              color: "white",
              fontFamily: "AeonikBold",
            }}
          >
            {topic?.title}
          </div>
          <div
            style={{
              fontSize: "1rem",
              color: "white",
              fontFamily: "AeonikBold",
              position: "absolute",
              bottom: 10,
              alignSelf: "center",
              opacity: 0.7,
            }}
          >
            {topic?.title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "AeonikBold", data: aeonikFontData, style: "normal" },
          { name: "Benzin", data: benzinFontData, style: "normal" },
        ],
      }
    )
  } catch (e) {
    return new Response("Failed to generate Topic OG Image", { status: 500 })
  }
}

async function getTopics(searchString: string): Promise<ITopic> {
  const { data, error } = await SUPABASE_CLIENT.from("topics")
    .select("*")
    .eq("id", 2)

  if (error) throw new Error(error.message)

  return data
}
