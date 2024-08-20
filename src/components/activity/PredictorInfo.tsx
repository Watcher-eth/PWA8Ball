import Link from "next/link";
import { getProfilePath } from "@/utils/urls";
import { ProfileToolTip } from "../profile/ProfileToolTip";

export function PredictorInfo({
  user_id,
  name,
  pfp,
  totalAmountUsdc,
  index,
}: {
  user_id: string;
  name: string;
  pfp: string;
  total_amount: number;
  index: number;
  totalAmountUsdc: number;
}) {
  return (
    <Link href={getProfilePath(user_id)}>
      <div className="flex flex-row hover:scale-101 active:scale-98  items-center justify-between my-1.5">
        <div className="flex flex-row items-center">
          <p className="text-white font-bold">{index + 1}</p>
          <ProfileToolTip
            user={{
              name: name,
              pfp: pfp,
              external_auth_provider_user_id: user_id,
            }}
          >
            <img
              src={
                pfp
                  ? pfp
                  : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6"
              }
              alt="Profile"
              className="size-[30px] rounded-full object-cover ml-2.5 mr-3"
            />
          </ProfileToolTip>
          <p className="text-white text-[19px] font-semibold">{name}</p>
        </div>
        <p className="text-[lightgray] text-[17px] font-medium">
          ${(totalAmountUsdc / 1000000).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
