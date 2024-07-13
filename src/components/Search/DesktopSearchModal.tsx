// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { SearchOverview } from "./SearchOverview";

export function DesktopSearchModal({ children }: { children: ReactNode }) {
  return (
    <Dialog className="!rounded-[1.5rem]">
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
          p-0 bg-[#080808]/[0.8] min-h-[50vh] border-2 border-[#181818]
          !rounded-[1.5rem]
        `}
      >
        <Card className="shadow-none bg-[#080808] border-0 rounded-[1.5rem]">
          <CardContent className="p-6 rounded-2xl">
            <SearchOverview />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
