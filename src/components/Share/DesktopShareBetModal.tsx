// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { ShareBetModal } from "./ShareBetModal";

export function DesktopShareBetModal({
  children,
  id,
  title,
  image,
  topic,
  question,
  options,
}: {
  children: ReactNode;
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: Option[];
}) {
  return (
    <Dialog className="!rounded-[1.5rem]">
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className="p-0 bg-[#080808]/[0.8] w-[35vw] min-h-[50vh] border-2 border-[#181818] !rounded-[1.5rem]"
      >
        <Card
          className="shadow-none bg-[#080808] border-0 rounded-[1.5rem]"
        >
          <CardContent className="p-6 rounded-2xl">
            <ShareBetModal
              isDesktop={true}
              id={id}
              title={title}
              image={image}
              topic={topic}
              question={question}
              options={options}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
