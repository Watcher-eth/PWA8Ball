// @ts-nocheck
import { SearchOverview } from "./SearchOverview";
import { DesktopCardModal } from "../Modals/DesktopCardModal";

export function DesktopSearchModal({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <DesktopCardModal
      content={<SearchOverview />}
    >
      {children}
    </DesktopCardModal>
  );
}
