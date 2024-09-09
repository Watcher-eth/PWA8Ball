import React from "react";
import { Gift, Landmark, Plus, Users } from "lucide-react";
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
        name="Total Value"
        value={`$${(
          props?.usdcStake / 10 ** 6 +
          props?.liquidityStake / 10 ** 6
        ).toFixed(2)}`}
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
  return (
    <div className="flex flex-row w-full items-center justify-between my-1.5">
      <div className="flex flex-row gap-2 items-center">
        <Icon className="text-[gray]" strokeWidth={2.8} size={16} />
        <span className="text-[gray] text-lg font-medium">{name}</span>
      </div>
      <span className="text-white text-lg font-semibold">{value}</span>
    </div>
  );
};
