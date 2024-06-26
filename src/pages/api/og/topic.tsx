import { ITopic, IUser } from "@/lib/supabase/types";
import { createClient } from "@supabase/supabase-js";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export default async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id")?.slice(0, 100) || "5";
    const fontData = await fetch(
      new URL("../../../../public/fonts/AeonikTRIAL-Bold.otf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const BenzinfontData = await fetch(
      new URL("../../../../public/fonts/Benzin-ExtraBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const supabaseUrl = "https://qcdmlllkzdjajrdtmthk.supabase.co";
    const supabaseAnonKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZG1sbGxremRqYWpyZHRtdGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwNDc4NDYsImV4cCI6MjAyNjYyMzg0Nn0.GoF1Ppedn6Yyxxr3tjvSzugQECmt6DRJemrLdf9HVLw";

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true, // This is generally true for web to handle OAuth redirects
      },
    });

    const fetchMembersForTopic = async (topicId: string): Promise<IUser[]> => {
      const { data, error } = await supabase
        .from("user_topics")
        .select(
          `
              users (
                internal_id,
                external_auth_provider_user_id,
                name,
                pfp
              )
            `
        )
        .eq("topic_id", topicId)
        .limit(5); // Limit the number of users to 5

      if (error) throw new Error(error.message);

      // Flatten the structure to directly get user details
      return data.map((entry) => entry.users).flat();
    };

    const getTopics = async (searchString: string): Promise<ITopic> => {
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .eq("id", 2);

      if (error) throw new Error(error.message);

      return data;
    };
    const topic = getTopics("3");
    const members = await fetchMembersForTopic("3");
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
              {topic?.title ? topic?.title : "US Elections"}
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                color: "#b3b3b3",
                marginBottom: "25px",
              }}
            >
              {topic?.description
                ? topic?.description
                : "Everything about the 2024 US Elections"}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "-8px",
                }}
              >
                <img
                  width="40px"
                  height="40px"
                  src={
                    members.length > 0
                      ? members[0].pfp
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjh2HDZ5kbbi4gS6Ki1m2vmkTwta2nJ4uKQA&s"
                  }
                  alt="Avatar 1"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <img
                  width="40px"
                  height="40px"
                  src={
                    members.length > 1
                      ? members[1].pfp
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQMZpF4lfChZnNqMYSziZuMjJphYbQO7IZw&s"
                  }
                  alt="Avatar 2"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <img
                  width="40px"
                  height="40px"
                  src={
                    members.length > 2
                      ? members[2].pfp
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ53_Ks7duOWtHFySS4pTDjlZ36bwfqHY-53w&s"
                  }
                  alt="Avatar 3"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </div>
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "medium",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginLeft: "8px",
                }}
              >
                {members.length}+ Members
              </span>
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
                fontFamily: "Benzin",
              }}
            >
              Blitz
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "22px 80px",
                backgroundColor: "#212121",
                border: "none",
                borderRadius: "60px",
                fontSize: "2.8rem",
                fontWeight: "bold",
                cursor: "pointer",
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
          { name: "AeonikBold", data: fontData, style: "normal" },
          { name: "Benzin", data: BenzinfontData, style: "normal" },
        ],
      }
    );
  } catch (e) {
    return new Response("Failed to generate Market OG Image", { status: 500 });
  }
}
