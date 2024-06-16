import { Globe } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function LandingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "70%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 35,
            padding: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Globe strokeWidth={3} color="black" size={25} />
            <div
              style={{
                fontSize: 22,
                color: "black",
                fontWeight: 700,
                marginLeft: 10,
              }}
            >
              2024 Worldwide
            </div>
          </div>
          <div style={{ fontSize: 22, color: "black", fontWeight: 700 }}>
            Blitz
          </div>
        </div>
        <div
          style={{
            width: "65vw",
            height: "85vh",
            position: "relative",
            paddingLeft: 50,
            paddingRight: 50,
            alignSelf: "center",
          }}
        >
          <Image
            alt="Splash Grafic"
            layout="fill"
            src={"/images/LandingPageGrafic.png"}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 35,
            padding: 25,
          }}
        >
          <Button
            style={{
              borderRadius: 20,
              backgroundColor: "black",
              padding: 7,
              paddingLeft: 12,
              paddingRight: 15,
            }}
          >
            <Image
              height={22}
              width={22}
              src={
                "https://thumbs.dreamstime.com/b/apple-logo-vector-company-inc-american-multinational-technology-headquartered-cupertino-108028563.jpg"
              }
            />
            <div
              style={{
                fontSize: 20,
                marginLeft: 4,
                color: "white",
                fontWeight: 700,
              }}
            >
              Download
            </div>
          </Button>
          <div
            style={{
              fontSize: 23,
              color: "black",

              fontWeight: 700,
            }}
          >
            Coming Soon
          </div>
        </div>
      </div>
      <div
        style={{
          width: "30vw",
          alignSelf: "center",
          height: "100vh",
          position: "relative",
          alignItems: "center",
        }}
      >
        <Image layout="fill" alt="Splash Grafic" src={"/images/Landing2.png"} />
      </div>
    </div>
  );
}

export default LandingPage;
