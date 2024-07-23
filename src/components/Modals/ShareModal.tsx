// @ts-nocheck
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { ShareBetModal } from "../Share/ShareBetModal";

export function ShareModal({
  children,
  id,
  title,
  image,
  topic,
  question,
  options,
  isDesktop
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: string;
  isDesktop: boolean;
}) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "WebShare Example",
          text: "Check out this website!",
          url: "https://www.example.com",
        });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:");
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log("Web Share not supported on this browser");
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <motion.div className="mt-4 hover:scale-110 active:scale-93 transition-all">
            {children}
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className={`
              bg-white rounded-3xl rounded-t-[20px]
              h-[90vh] mb-5 w-screen relative
              ${isDesktop ? "border-0" : "border-t-[1px] border-[#262626]"}
            `}
          >
            <ShareBetModal
              id={id}
              title={title}
              image={image}
              topic={topic}
              question={question}
              options={options}
            />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
