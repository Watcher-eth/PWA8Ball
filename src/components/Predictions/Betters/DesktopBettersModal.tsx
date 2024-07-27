// @ts-nocheck
import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { BettersOverview } from "./BettersOverview";

export function DesktopBettersModal({
  children,
  title,
  question,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
}) {
  return (
    <DesktopCardModal
      cardContentClassName="bg-[#080808]/30  backdrop-blur-lg"
      dialogContentClassName="xl:max-w-[28%] sm:max-w-[55%] md:max-w-[35%]"
      content={
        <BettersOverview
          isDesktop={true}
          title={title}
          question={question}
          image={image}
          optionA={optionA}
          optionB={optionB}
          odds={odds}
          marketId={marketId}
          users={users}
        />
      }
    >
      {children}
    </DesktopCardModal>
  );
}
