// @ts-nocheck

import { Globe } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function LandingPage() {
  return (
    <div className="flex flex-row">
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
        <div className="relative w-[65vw] h-[85vh] px-12 self-center">
          <img
            alt="Splash Grafic"
            src="/images/LandingPageGrafic.png"
            className="w-full h-full object-cover"
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
            <img
              className="size-[22px]"
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
      <div className="w-[30vw] self-center h-screen relative flex items-center">
        <img
          alt="Splash Grafic"
          src="/images/Landing2.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LandingPage;
