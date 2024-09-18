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
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: "4.8rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "10px",
                marginTop: "15px",
              }}
            >
              {topic?.title ?? "US Elections"}
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                color: "#b3b3b3",
                marginBottom: "25px",
                maxWidth: "70%",
              }}
            >
              {topic?.description ?? "Everything about the 2024 US Elections"}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "54px",
              right: "54px",
              width: "300px",
              height: "300px",
              borderRadius: "20px",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <img
              src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/gta-6-rockstar-car-overlooking-the-city.jpeg"
              alt="US Elections"
              width="300px"
              height="300px"
              style={{
                objectFit: "cover",

                width: "300px",
                height: "300px",
                borderRadius: "20px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "-10px",
                paddingRight: "4rem",
                maxWidth: "50%",
                display: "flex",
                lineHeight: "5.2rem",
                fontFamily: "AeonikBold",
              }}
            >
              Glimpse
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "22px 80px",
                backgroundColor: "#181818",
                border: "none",
                borderRadius: "60px",
                fontSize: "2.8rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "1.5px solid #212121",
                color: "white",
              }}
            >
              Join
            </button>
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
