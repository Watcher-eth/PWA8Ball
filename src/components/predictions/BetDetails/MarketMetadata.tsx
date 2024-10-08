import React from "react"
import {
  Gift,
  Landmark,
  Plus,
  Users,
  TriangleAlert,
  Sticker,
  Check,
} from "lucide-react"
import { AvatarGroup } from "@/components/topic/AvatarGroup"
import { Market, User } from "@/__generated__/graphql"
import { Address } from "viem"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"

interface MarketMetadataProps {
  usdcStake: number
  liquidityStake: number
  creator: User
  users: string[]
  length: number
  creatorAddress: Address
  creatorLoading: boolean
  handleOpenVotersSheet: () => void
}

export const MarketMetadata: React.FC<MarketMetadataProps> = (props) => {
  return (
    <div className="flex flex-col w-full gap-1.5 px-4">
      <MetadataItem
        name="Total Liquidity"
        value={(props?.liquidityStake / 10 ** 6).toFixed(2)}
        icon={Landmark}
      />
      <MetadataItem name="Rewards" value={`3x Multiplier`} icon={Gift} />
      <CreatorItem
        name="Created by"
        value={props.creatorAddress}
        loading={props?.creatorLoading}
        user={props?.creator}
        icon={Plus}
      />
      <div className="flex flex-row w-full items-center justify-between my-1.5">
        <div className="flex flex-row gap-2 items-center">
          <Users className="text-[gray]" strokeWidth={2.8} size={16} />
          <span className="text-[gray] text-[1rem] font-medium">
            Predictors
          </span>
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
  )
}

interface MetadataItemProps {
  name: string
  value: string
  icon: React.ElementType
}

const MetadataItem: React.FC<MetadataItemProps> = ({
  name,
  value,
  icon: Icon,
}) => {
  console.log("item", name, value)
  return (
    <div
      className={`flex flex-row w-full items-center justify-between ${
        name === "Total Liquidity" ? "my-1.5" : "my-1"
      }`}
    >
      <div className="flex flex-row gap-2 items-center">
        <Icon className="text-[gray]" strokeWidth={2.8} size={15} />
        <span className="text-[gray] text-[1rem] font-medium">{name}</span>
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
        <span className="text-white text-[1rem] font-semibold">
          {name === "Total Liquidity" && "$"}
          {value}
        </span>
      </div>
    </div>
  )
}

interface CreatorItemProps {
  name: string
  value: string
  loading: boolean
  user: User
  icon: React.ElementType
}

const CreatorItem: React.FC<CreatorItemProps> = ({
  name,
  value,
  user,
  loading,
  icon: Icon,
}) => {
  console.log("item", name, value)
  return (
    <div className="flex flex-row w-full items-center justify-between my-1 ">
      <div className="flex flex-row gap-2 items-center">
        <Icon className="text-[gray]" strokeWidth={2.8} size={15} />
        <span className="text-[gray] text-[1rem] font-medium">{name}</span>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-white text-[1rem] font-semibold">{value}</span>
        <img
          src={user?.pfp ? user?.pfp : DEFAULT_PFP_PLACEHOLDER}
          className="h-5 w-5 rounded-full"
        />
      </div>
    </div>
  )
}
