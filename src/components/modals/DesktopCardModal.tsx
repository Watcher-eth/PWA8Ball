// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  // Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Card } from "@/components/ui/tailwind/Card";
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
  onOpenChange = null,
  open,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  subtitle?: string;
  dialogContentClassName?: string;
  cardClassName?: string;
  cardContentClassName?: string;
  dialogClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className={`!rounded-[1.5rem] ${dialogClassName}`}
    >
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
          p-0 bg-transparent  border-0
          rounded-2xl ${dialogContentClassName}
        `}
      >
        <motion.div layout transition={{ duration: 0.3 }}>
          <AnimatePresence>
            <Card
              className={`
            shadow-none !p-0 w-full
            rounded-2xl  !bg-[#080808]/85 ${cardClassName}
          `}
            >
              {(title || subtitle) && (
                <CardHeader className="border-b border-[#212121]">
                  <CardTitle className="text-white">{title}</CardTitle>
                  <CardDescription className="text-[lightgray]">
                    {subtitle}
                  </CardDescription>
                </CardHeader>
              )}
              <CardContent
                className={`p-6 rounded-2xl ${cardContentClassName}`}
              >
                {content}
              </CardContent>
            </Card>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
