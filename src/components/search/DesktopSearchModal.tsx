import { SearchOverview } from "./SearchOverview";
import { DesktopCardModal } from "../modals/DesktopCardModal";

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