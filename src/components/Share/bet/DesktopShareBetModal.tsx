// @ts-nocheck
import { ShareBetContent } from "./ShareBetContent";
import { DesktopCardModal } from "../../modals/DesktopCardModal";

export function DesktopShareBetModal({
  children,
  id,
  title,
  image,
  topic,
  question,
  options,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: Option[];
}) {
  return (
    <DesktopCardModal
      dialogContentClassName="!w-[35vw]"
      content={
        <ShareBetContent
          isDesktop={true}
          id={id}
          title={title}
          image={image}
          topic={topic}
          question={question}
          options={options}
        />
      }
    >
      {children}
    </DesktopCardModal>
  );
}
