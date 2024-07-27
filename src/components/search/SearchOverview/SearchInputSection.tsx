import { Search } from "lucide-react"

export function SearchInputSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative flex items-center align-center group pb-4">
      <Search
        className="size-5 text-gray-400 group-focus-within:text-gray-200"
        strokeWidth={3}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for predictions..."
        className={`
            w-full outline-none border-0
            py-2 px-4
            bg-[transparent] text-white placeholder-[#707070]
            text-[1rem] rounded-lg
          `}
      />
    </div>
  );
}
