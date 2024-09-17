// @ts-nocheck

import { ImageResponse } from "@vercel/og"

import { IMarketWithTopicDetails } from "@/supabase/types"
import { SUPABASE_CLIENT } from "@/supabase/supabaseClient"
import { aeonikFontDataPromise, benzinFontDataPromise } from "@/utils/fonts"

export const runtime = "edge"

export default async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    const [aeonikFontData, benzinFontData] = await Promise.all([
      aeonikFontDataPromise,
      benzinFontDataPromise,
    ])

    const markets = await fetchTrendingMarkets()
    const imgProps = {
      style: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      },
    }
    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "55px",
            backgroundColor: "#151515",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingTop: "65px",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to top, #101010, transparent)",
              borderRadius: "20px",
              display: "flex",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              padding: "3px",
              alignSelf: "flex-start",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "5.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "28px",
                paddingRight: "4rem",
                maxWidth: "50%",
                display: "flex",
                lineHeight: "5.2rem",
              }}
            >
              Predict the future
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "medium",
                color: "#dedede",
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              With your
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "medium",
                  color: "#fefefe",
                  display: "flex",
                  alignItems: "center",
                  gap: "-12px",
                }}
              >
                <img
                  {...imgProps}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjh2HDZ5kbbi4gS6Ki1m2vmkTwta2nJ4uKQA&s"
                  alt="Avatar 1"
                />
                <img
                  {...imgProps}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQMZpF4lfChZnNqMYSziZuMjJphYbQO7IZw&s"
                  alt="Avatar 2"
                />
                <img
                  {...imgProps}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ53_Ks7duOWtHFySS4pTDjlZ36bwfqHY-53w&s"
                  alt="Avatar 3"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-4%",
              right: "-18px",
              transform: "translateY(-50%) rotate(4deg)",
              transform: "rotate(4deg)",

              display: "flex",
              flexDirection: "column",
              gap: "19px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "280px",
                height: "350px",
                borderRadius: "15px",
                display: "flex",
              }}
            >
              <img
                src={
                  markets[0]?.image ??
                  "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/71d4d17edcd49703a5ea446cc0e588e6.jpg"
                }
                alt="Image 1"
                width="130px"
                height="200px"
                style={{
                  borderRadius: "15px",
                  objectFit: "cover",
                  width: "280px",
                  height: "350px",
                }}
              />
            </div>
            <div
              style={{
                width: "280px",
                height: "420px",
                borderRadius: "15px",
                marginBottom: "-30px",
                display: "flex",
              }}
            >
              <img
                src={
                  markets?.length > 1
                    ? markets[1].image
                    : "https://static01.nyt.com/images/2015/12/18/business/18shkreli-web4/18shkreli-web4-superJumbo.jpg"
                }
                alt="Image 2"
                width="160px"
                height="190px"
                style={{
                  borderRadius: "15px",
                  objectFit: "cover",
                  width: "280px",
                  height: "350px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "-3%",
              right: "287px",
              transform: "translateY(-50%)",
              transform: "rotate(4deg)",

              display: "flex",
              flexDirection: "column",
              gap: "52px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "290px",
                height: "350px",
                borderRadius: "15px",
                marginBottom: "-30px",
                display: "flex",
              }}
            >
              <img
                src={
                  markets?.length > 2
                    ? markets[2].image
                    : "https://images.wsj.net/im-951792/?width=1278&size=1"
                }
                alt="Image 3"
                width="160px"
                height="190px"
                style={{
                  borderRadius: "15px",
                  objectFit: "cover",
                  width: "290px",
                  height: "350px",
                }}
              />
            </div>
            <div
              style={{
                width: "290px",
                height: "350px",
                borderRadius: "15px",
                display: "flex",
              }}
            >
              <img
                src={
                  markets?.length > 3
                    ? markets[3].image
                    : "https://mir-s3-cdn-cf.behance.net/project_modules/hd/e0c434105236109.5f748bd4b96a7.jpg"
                }
                alt="Image 4"
                width="160px"
                height="195px"
                style={{
                  borderRadius: "15px",
                  objectFit: "cover",
                  width: "290px",
                  height: "350px",
                }}
              />
            </div>
          </div>
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
              fontFamily: "Benzin",
            }}
          >
            Glimpse
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
    return new Response("Failed to generate Market OG Image", { status: 500 })
  }
}

async function fetchTrendingMarkets(): Promise<IMarketWithTopicDetails[]> {
  const { data, error } = await SUPABASE_CLIENT.rpc("get_trending_markets")

  if (error) {
    console.error("Fetch Trending Markets Error:", error.message)
    throw new Error(error.message)
  }

  return data
}
