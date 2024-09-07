
import { fillUserImages } from "@/utils/fillUserImages";

import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Grid } from "@/components/ui/tailwind/Grid";
import { Col } from "@/components/ui/tailwind/Col";
import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import { CommentSection } from "@/components/predictions/CommentSection";
import { BetDetails } from "@/components/predictions/BetDetails";
import { RelatedMarkets } from "@/components/predictions/RelatedMarkets";

import { DesktopPredictComponent } from "../DesktopPredictComponent";

import { AlignLeft, Users } from "lucide-react";

import { useGetHighestOrderOption } from "@/supabase/queries/markets/useGetHighestOrderOption";
import { DesktopBettersModal } from "../Betters/DesktopBettersModal";
import { RulesCollapsible } from "../BetDetails/RulesCollapsible";
import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useCheckReferral } from "@/hooks/useCheckReferral";
import { Chip } from "@/components/ui/Chip";
import { commifyBigIntToString } from "@/utils/bigint/format";

export function DesktopMarketHeader({
  id,
  title,
  question,
  usdcstake,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
  options,
  liquidityTotal,
  userImages=[],
  members,
  topic_image,
  topic_id,
  topic_description,
  topic_title,
  ...rest
} ) {
  console.log(rest);
  const formattedLiquidityTotal = commifyBigIntToString(BigInt(liquidityTotal), 18, 2)

  const openLoginModal = useModalStore((state) => state.openLoginModal);
  return (
    <Grid gap={4} cols={{ xs: 8 }}>
      <Col xs={4} lg={5}>
        <div className="flex flex-col mt-10 z-10">
          <div className="text-4xl pr-10 text-start pl-5 pb-0 p-3 text-white font-bold">
            {title}
          </div>
          <div className="text-lg font-medium line-clamp-2 mb-0 mt-2 text-start text-white/80 max-w-full ml-5 leading-[1.35rem]">
            {question}
          </div>
          <div className="flex justify-between mt-4 items-center mx-5">
            <div className="flex pt-2 space-x-2">
              <Chip className="flex-shrink space-x-2 pt-0.5">
                <Users
                  size="16"
                  strokeWidth={2.7}
                  color="gray"
                  className="inline -mt-0.5"
                />
                <div className="inline-block text-[lightgray] text-sm">
                  69+ Predictors
                </div>
              </Chip>
              <Chip className="flex-shrink space-x-1 text-[lightgray] pt-1 text-sm">
                $
                <span className="font-semibold text-[lightgray]">
                  {formattedLiquidityTotal}
                </span>
                <div className="inline-block  text-sm text-white/60">
                  at Stake
                </div>
              </Chip>
            </div>
          </div>
        </div>
      </Col>
    </Grid>
  );
}
