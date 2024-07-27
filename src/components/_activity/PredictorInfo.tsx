import Link from "next/link";
import { getProfilePath } from "@/utils/urls";

export function PredictorInfo({
  user_id,
  name,
  pfp,
  total_amount,
  index,
}: {
  user_id: string;
  name: string;
  pfp: string;
  total_amount: number;
  index: number;
}) {
  return (
    <Link href={getProfilePath(user_id)}>
      <div className="flex flex-row items-center justify-between my-1.5">
        <div className="flex flex-row items-center">
          <p className="text-white font-bold">{index + 1}</p>
          <img
            src={pfp}
            alt="Profile"
            className="size-[30px] rounded-full object-cover ml-2.5 mr-3"
          />
          <p className="text-white text-[17px] font-semibold">{name}</p>
        </div>
        <p className="text-[lightgray] text-[15px] font-medium">
          ${(total_amount / 1000000).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
