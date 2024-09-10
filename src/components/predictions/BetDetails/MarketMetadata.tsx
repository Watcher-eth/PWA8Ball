import React from "react";
import {
  Gift,
  Landmark,
  Plus,
  Users,
  TriangleAlert,
  Sticker,
  Check,
} from "lucide-react";
import { AvatarGroup } from "@/components/topic/AvatarGroup";

interface MarketMetadataProps {
  usdcStake: number;
  liquidityStake: number;
  creator: string;
  users: string[];
  length: number;
  handleOpenVotersSheet: () => void;
}

export const MarketMetadata: React.FC<MarketMetadataProps> = (props) => {
  console.log("params3", props);
  return (
    <div className="flex flex-col w-full gap-1.5 px-4">
      <MetadataItem
        name="Total Liquidity"
        value={(props?.liquidityStake / 10 ** 6).toFixed(2)}
        icon={Landmark}
      />
      <MetadataItem name="Rewards" value={`3x 🔭`} icon={Gift} />
      <MetadataItem name="Created by" value={props.creator} icon={Plus} />
      <div className="flex flex-row w-full items-center justify-between my-1.5">
        <div className="flex flex-row gap-2 items-center">
          <Users className="text-[gray]" strokeWidth={2.8} size={16} />
          <span className="text-[gray] text-lg font-medium">Predictors</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <AvatarGroup
            onClick={props.handleOpenVotersSheet}
            images={props.users.length > 3 ? props.users : props.users}
            height={22}
            width={22}
          />
        </div>
      </div>
    </div>
  );
};

interface MetadataItemProps {
  name: string;
  value: string;
  icon: React.ElementType;
}

const MetadataItem: React.FC<MetadataItemProps> = ({
  name,
  value,
  icon: Icon,
}) => {
  console.log("item", name, value);
  return (
    <div className="flex flex-row w-full items-center justify-between my-1.5">
      <div className="flex flex-row gap-2 items-center">
        <Icon className="text-[gray]" strokeWidth={2.8} size={16} />
        <span className="text-[gray] text-lg font-medium">{name}</span>
      </div>
      <div className="flex flex-row gap-2 items-center">
        {name === "Total Liquidity" && Number(value) < 100 ? (
          <div
            style={{ backgroundColor: "rgb(255, 63, 63, 0.1)" }}
            className="flex p-2 py-0.5 text-[0.8rem] font-[700] rounded-full  text-[#FF3F3F] flex-row gap-1 items-center"
          >
            <TriangleAlert color="#FF3F3F" strokeWidth={3} size={13} />
            <div>Low</div>
          </div>
        ) : name === "Total Liquidity" && Number(value) > 10000 ? (
          <div
            style={{ backgroundColor: "rgb(255, 184, 0, 0.3)" }}
            className="flex p-2 py-0.5 text-[0.8rem] font-[700] rounded-full  text-[#FFB800] flex-row gap-1 items-center"
          >
            <Sticker color="#FFB800" strokeWidth={3} size={13} />
            <div className="text-[#FFB800] ">Medium</div>
          </div>
        ) : name === "Total Liquidity" && Number(value) > 100000 ? (
          <div
            style={{ backgroundColor: "rgb(52, 199, 89, 0.15)" }}
            className="flex p-2 py-0.5 text-[0.8rem] font-[700] rounded-full  text-[#34C759] flex-row gap-1 items-center"
          >
            <Check color="#34C759" strokeWidth={4.5} size={12} />
            <div className="text-[#34C759] ">Good</div>
          </div>
        ) : null}
        <span className="text-white text-lg font-semibold">
          {name === "Total Liquidity" && "$"}
          {value}
        </span>
      </div>
    </div>
  );
};
