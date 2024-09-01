import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { SearchOverview } from "./SearchOverview";

export function DesktopSearchModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      cardContentClassName="bg-[#090909]/85 min-h-[70vh] backdrop-blur-lg"
      content={<SearchOverview />}
    >
      {children}
    </DesktopCardModal>
  );
}
