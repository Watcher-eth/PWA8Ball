// @ts-nocheck
import { Globe } from "lucide-react";
import { Button } from "../ui/Button";

export default function LandingPage() {
  return (
    <div className="flex flex-row">
      <div className="w-[70%] bg-white flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between pt-9 p-6">
          <div className="flex flex-row items-center">
            <Globe strokeWidth={3} color="black" size={25} />
            <div className="text-[22px] text-black font-bold ml-2">
              2024 Worldwide
            </div>
          </div>
          <div className="text-[22px] text-black font-bold">Blitz</div>
        </div>
        <div className="relative w-[65vw] h-[85vh] px-12 self-center">
          <img
            alt="Splash Grafic"
            src="/images/LandingPageGrafic.png"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-row items-center justify-between pb-9 p-6">
          <Button className="rounded-[20px] bg-black p-2 pl-3 pr-4">
            <img
              className="size-[22px]"
              src={
                "https://thumbs.dreamstime.com/b/apple-logo-vector-company-inc-american-multinational-technology-headquartered-cupertino-108028563.jpg"
              }
            />
            <div className="text-[20px] ml-1 text-white font-bold">
              Download
            </div>
          </Button>
          <div className="text-[23px] text-black font-bold">
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

