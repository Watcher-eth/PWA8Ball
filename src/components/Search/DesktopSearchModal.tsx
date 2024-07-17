// @ts-nocheck
import { SearchOverview } from "./SearchOverview";
import { DesktopCardModal } from "../Modals/DesktopCardModal";

export function DesktopSearchModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      cardContentClassName="bg-[#080808]/75 backdrop-blur-lg"
      content={<SearchOverview />}
    >
      {children}
    </DesktopCardModal>
  );
}
