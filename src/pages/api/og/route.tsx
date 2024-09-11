import { ImageResponse } from "@vercel/og"

import { IUser } from "@/supabase/types"
import { SUPABASE_CLIENT } from "@/supabase/supabaseClient"
import { aeonikFontDataPromise } from "@/utils/fonts"
import { getLevel } from "@/constants/CredLevels"

export const runtime = "edge"

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id =
      searchParams.get("id")?.slice(0, 100) ||
      "did:privy:clutganzs01rz2oqk4vvlw1ih"
    const fontData = await aeonikFontDataPromise
    const user = await fetchUserByExternalAuthId(id)

    const level = getLevel(user?.liquidityPoints!)
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
          <img
            src={"../images/ProfileMetaBg.png"}
            alt="Background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "cover",
              width: 1200,
              height: 230,
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: 1200,
              height: 230,
              background: "linear-gradient(to top, #070707, transparent)",
              borderRadius: "8px",
            }}
          ></div>

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0",
              paddingBottom: "16px",
            }}
          >
            <img
              src={user?.pfp}
              alt="Profile"
              style={{
                width: "250px",
                height: "250px",
                marginBottom: "20px",
                borderRadius: "50%",
                borderWidth: 6,
                marginTop: "20px",
                borderColor: "#070707",
                border: "3px #070707 solid",
              }}
            />
            <h2
              style={{
                fontSize: "4.8rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {user?.name}
            </h2>
            <p
              style={{
                marginTop: "-1.3rem",
                fontSize: "3.3rem",
                fontWeight: "normal",
                color: "#eeeeee",
                padding: "0.4rem 1rem",
                borderRadius: "50%",
                backgroundColor: "#181818",
                border: "1.5px solid #212121",
              }}
            >
              {level.name}
            </p>
          </div>
          <div
            style={{ position: "absolute", bottom: "16px", right: "16px" }}
          ></div>
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

async function fetchUserByExternalAuthId(
  externalAuthId: string
): Promise<IUser | null> {
  const { data, error } = await SUPABASE_CLIENT.from("users")
    .select("*")
    .eq("external_auth_provider_user_id", externalAuthId)
    .single() // Using .single() because we expect at most one record

  if (error) {
    console.error("Fetch User By External Auth ID Error:", error.message)
    throw new Error(error.message)
  }

  return data
}
