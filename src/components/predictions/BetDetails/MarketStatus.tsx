import { useState, useEffect } from "react";
import { BadgeHelp, Calendar, Goal, ListChecks, Plus, Split } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { User } from "@/__generated__/graphql"; // Assuming you're using this generated type
import {
  formatUnixTimestamp,
  parseAndFormatDate,
} from "@/utils/datetime/extractEndDate";

// Utility Functions

interface StatusRowProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  isLast?: boolean;
  status?: boolean;
}

const StatusRow: React.FC<StatusRowProps> = ({
  icon: Icon,
  title,
  subtitle,
  isLast,
  status,
}) => {
  return (
    <div className="flex flex-row mt-7">
      <div className="flex items-center">
        <div className="w-9 h-9 flex justify-center self-start mt-1 items-center relative rounded-full bg-[#191919] ml-2 mr-5">
          <Icon
            className={title === "Created on" ? "stroke-[4]" : "stroke-[3]"}
            size={20}
            strokeWidth={2}
            color="white"
          />
          {!isLast && (
            <div className="w-[0.1rem] absolute left-4 -bottom-9 h-7 bg-[#212121] mt-4 "></div>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-1">
        <div className="flex flex-col -gap-1.5">
          <span className="text-white text-lg font-[600]">{title}</span>
          <span className="text-[#808080] text-base">{subtitle}</span>
        </div>

        {title !== "Created on" && (
          <div
            className={`h-6 w-6 flex bg-${
              status ? "[#090909]" : "[#080808]"
            } rounded-full justify-center items-center`}
          >
            <PulsingView status={status} />
          </div>
        )}
      </div>
    </div>
  );
};

interface StatusBlockProps {
  endDate: string;
  createdAt: string;
  resolved: boolean;
  outcome: number;
  resolvedAt: string;
  proposedOutcome: number;
  proposedAt: string;
  creator: User;
}

export const StatusBlock: React.FC<StatusBlockProps> = ({
  endDate,
  createdAt,
  resolved,
  outcome,
  resolvedAt,
  proposedOutcome,
  proposedAt,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { fullMonth, fullDay, year } = parseAndFormatDate(
    "12th September, 2024"
  );
  const createdDate = formatUnixTimestamp(Number(createdAt));
  const proposedAtFormatted = formatUnixTimestamp(Number(proposedAt));
  const resolvedAtFormatted = formatUnixTimestamp(Number(resolvedAt));

  const toggleStatus = () => setExpanded(!expanded);

  return (
    <div className="flex flex-col px-4">
      <div className="h-[0.1rem] w-full bg-[#151515] my-4"></div>

      <div className="flex flex-row justify-between -mb-3">
        <span className="text-white text-lg font-semibold">Timeline</span>
        <span className="text-[#909090] text-sm font-semibold">Status</span>
      </div>

      <StatusRow
        icon={Goal}
        status={!proposedOutcome}
        title="Open for Predictions"
        subtitle={
          proposedOutcome ? "Prediction period ended" : "Live right now"
        }
      />
      <StatusRow
        icon={Calendar}
        status={proposedOutcome !== null}
        title="End Date"
        subtitle={`${fullDay} of ${fullMonth}, ${year}`}
      />

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: expanded ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <StatusRow
          icon={BadgeHelp}
          status={resolved}
          title="Creator Resolution"
          subtitle={
            resolved
              ? `Outcome proposed on ${proposedAtFormatted}`
              : "Resolution hasn't started yet"
          }
        />
        <StatusRow
          icon={Split}
          status={proposedOutcome !== null}
          title="Dispute period"
          subtitle="24hrs after outcome proposed"
        />
        <StatusRow
          icon={ListChecks}
          status={outcome !== null}
          title="Redeem your winnings"
          subtitle={
            outcome
              ? `Resolved on ${resolvedAtFormatted}`
              : "This prediction hasn't resolved yet"
          }
          isLast
        />
      </motion.div>

      {!expanded && (
        <div className="bg-gradient-to-b from-transparent via-[rgba(8,8,8,0.5)] to-[#080808] h-11 w-full mt-[-25px]"></div>
      )}

      <button
        onClick={toggleStatus}
        className="text-[#808080] text-base text-[0.95rem] underline mt-2"
      >
        {expanded ? "Hide current status" : "Show current status"}
      </button>

      <div className="h-[0.1rem] w-full bg-[#151515] my-4"></div>
    </div>
  );
};

interface PulsingViewProps {
  status?: boolean;
}

const PulsingView: React.FC<PulsingViewProps> = ({ status }) => {
  const innerControls = useAnimation();
  const outerControls = useAnimation();

  useEffect(() => {
    const pulseSequence = async () => {
      while (true) {
        // Inner pulse first
        await innerControls.start({
          scale: [1, 1.5, 1],
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        });

        // Outer pulse after
        await outerControls.start({
          scale: [1, 2.5, 1],
          opacity: [1, 0.6, 0],
          filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
      }
    };

    pulseSequence();
  }, [innerControls, outerControls]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer blurred pulsing circle */}
      <motion.div
        animate={outerControls}
        className={`absolute w-2 h-2 rounded-full ${
          status ? "bg-green-400/20" : "bg-[#404040]"
        }`}
      ></motion.div>

      {/* Inner bright pulsing circle */}
      <motion.div
        animate={innerControls}
        className={`relative w-2 h-2 rounded-full ${
          status ? "bg-green-500/70" : "bg-[#404040]"
        }`}
      ></motion.div>
      <motion.div
        animate={innerControls}
        className={`absolute z-4 w-1 h-1 rounded-full ${
          status ? "bg-green-400/40" : "bg-[#454545]"
        }`}
      ></motion.div>
    </div>
  );
};