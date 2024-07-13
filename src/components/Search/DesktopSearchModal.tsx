// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { SearchOverview } from "./SearchOverview";
import { DesktopCardModal } from "../Modals/DesktopCardModal";

export function DesktopSearchModal({ children }: { children: React.ReactNode }) {
  return (
    <DesktopCardModal
      content={<SearchOverview />}
    >
      {children}
    </DesktopCardModal>
  );
}
