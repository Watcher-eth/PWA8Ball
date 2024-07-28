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
      dialogContentClassName="sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%]"
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
