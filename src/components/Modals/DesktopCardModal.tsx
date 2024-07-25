// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
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
          p-0 bg-transparent min-h-[50vh] border-0
          rounded-2xl ${dialogContentClassName}
        `}
      >
        <Card
          className={`
            shadow-none
            border-2 border-[#181818]
            rounded-2xl ${cardClassName}
          `}
        >
          {(title || subtitle) && (
            <CardHeader className="border-b border-[#212121]">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
          )}
          <CardContent className={`p-6 rounded-2xl ${cardContentClassName}`}>
            <motion.div layout transition={{ duration: 0.2 }}>
              <AnimatePresence>{content}</AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
