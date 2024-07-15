// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function DesktopCardModal({
  children,
  content,
  title,
  subtitle,
  dialogContentClassName = "",
  cardClassName = "",
  cardContentClassName = "",
  dialogClassName = "",
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  subtitle?: string;
  dialogContentClassName?: string;
  cardClassName?: string;
  cardContentClassName?: string;
  dialogClassName?: string;
}) {
  return (
    <Dialog className={`!rounded-[1.5rem] ${dialogClassName}`}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
          p-0 bg-[#080808]/80 min-h-[50vh] border-2 border-[#181818]
          !rounded-[1.5rem] ${dialogContentClassName}
        `}
      >
        <Card
          className={`shadow-none bg-[#080808] border-0 rounded-[1.5rem] ${cardClassName}`}
        >
          {(title || subtitle) && (
            <CardHeader className="border-b border-[#212121]">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
          )}
          <CardContent className={`p-6 rounded-2xl ${cardContentClassName}`}>
            {content}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
