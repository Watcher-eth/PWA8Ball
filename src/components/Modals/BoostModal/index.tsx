import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ConfirmButton } from "./ConfirmButton";
import { BoostInfoRow } from "./DesktopBoostModal";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function BoostModal({
  children,
  image,
  id,
}: {
  children: React.ReactNode;
  image: string;
  id: string;
}) {
  const [amount, setAmount] = useState<number>();

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="w-full">{children}</DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <div className="flex flex-col p-2 ">
            <img className="h-14 w-14 object-cover rounded-full" src={image} />
            <div className="text-white text-[1.5rem] font-semibold mt-4 ">
              Boost and earn rewards
            </div>
            <div className="text-[lightgray] text-[0.95rem] font-medium mb-3  ">
              Boost this market to earn extra cred and trading fees. The more
              popular a prediction gets the more fees you receive.
            </div>
            <div className="h-[0.1rem] w-full bg-[#212121] mt-2 mb-5" />
            <BoostInfoRow label="Minimum Boost" content="$10.00" />
            <BoostInfoRow
              label="Fee Rewards Rate"
              content={
                <div className="text-white font-medium text-[1.05rem] px-2 py-1 rounded-md bg-[#FF0050]">
                  0.5%
                </div>
              }
            />
            <BoostInfoRow label="Cred Bonus" content="150 Cred" />
            <Input
              onChange={(e) => setAmount(Number(e.target.value))}
              className=" my-5 border border-[#212121] rounded-md p-6 bg-[#151515] font-medium px-3 text-[1rem]"
              placeholder="Amount"
              type="number"
            />
            <ConfirmButton id={id} onComplete={() => {}} amount={amount} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
