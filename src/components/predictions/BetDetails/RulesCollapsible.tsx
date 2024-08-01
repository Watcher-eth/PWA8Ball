import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CalendarDays,
  ChevronDown,
  Cog,
  InfoIcon,
  ListTodo,
  PlusCircle,
  SearchCheck,
} from "lucide-react";

interface RuleProps {
  marketId: number;
  creator: { name: string; pfp: string; id: string };
  resolutionMethod: string;
  outcome: string;
  options: string;
}

export function RulesCollapsible() {
  //TODO: Get resolution status


  return (
    <Collapsible>
      <CollapsibleTrigger>
        <div className="flex flex-row items-center justify-between w-full py-4 px-2 border-t-width-1.5 border-t-width-1.5 border-[#212121]">
          <div className="flex flex-row items-center space-x-3">
            <CalendarDays strokeWidth={3.5} size={22} color="white" />
            <div className="text-22 text-white font-[Aeonik-Bold]">
              Timeline and resolution details
            </div>
          </div>
          <ChevronDown strokeWidth={3} size={20} color="white" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex fex-col space-y-4">
        <div className="flex flex-row items-center justify-between w-full py-4 px-2">
          <div className="flex flex-row items-center space-x-3">
            <PlusCircle strokeWidth={3.5} size={22} color="white" />
            <div className="text-22 text-white font-[Aeonik-Bold]">
              Created on May 23rd, 2024
            </div>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="text-22 text-[#909090] font-[Aeonik-Bold]">
              0xChristina.eth
            </div>
            <img src={""} className="h-22 w-22 rounded-full" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full py-4 px-2">
          <div className="flex flex-row items-center space-x-3">
            <ListTodo strokeWidth={3.5} size={22} color="white" />
            <div className="text-22 text-white font-[Aeonik-Bold]">
              Outcome:
            </div>
          </div>
          <div className="text-22 text-[#909090] font-[Aeonik-Bold]">
            Unresolved
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full py-4 px-2">
          <div className="flex flex-row items-center space-x-3">
            <SearchCheck strokeWidth={3.5} size={22} color="white" />
            <div className="text-22 text-white font-[Aeonik-Bold]">
              Resolution status:
            </div>
          </div>
          <div className="text-22 text-[#909090] font-[Aeonik-Bold]">
            Resolution hasn't started yet
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full py-4 px-2">
          <div className="flex flex-row items-center space-x-3">
            <Cog strokeWidth={3.5} size={22} color="white" />
            <div className="text-22 text-white font-[Aeonik-Bold]">
              How will this market resolve?{" "}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="text-22 text-[#909090] font-[Aeonik-Bold]">
              Creator Resolution
            </div>
            <InfoIcon strokeWidth={3.2} size={20} color="[#909090]" />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
