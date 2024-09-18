// @ts-nocheck
import { ImageResponse } from "@vercel/og"

import { ITopic, IUser } from "@/supabase/types"

import { SUPABASE_CLIENT } from "@/supabase/supabaseClient"
import { aeonikFontDataPromise, benzinFontDataPromise } from "@/utils/fonts"

export const runtime = "edge"

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")?.slice(0, 100)
    const [aeonikFontData, benzinFontData] = await Promise.all([
      aeonikFontDataPromise,
      benzinFontDataPromise,
    ])

    const topic = await getTopics(id)

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
            src={topic?.image}
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
              fontSize: "7.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              marginTop: 30,
            }}
          >
            {topic?.title}
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "white",
              fontFamily: "AeonikBold",
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
            }}
          >
            GLIMPSE
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

async function getTopics(searchString: string): Promise<ITopic | null> {
  const { data, error } = await SUPABASE_CLIENT.from("topics")
    .select("*")
    .eq("id", searchString)
    .single() // This ensures only one object is returned, instead of an array

  if (error) throw new Error(error.message)

  return data // Data should be a single topic or null
}
