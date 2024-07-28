import Link from "next/link";
import { UserCircle } from "lucide-react";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { getProfilePath } from "@/utils/urls";


export function BettersOverviewItem({
  name,
  walletaddress,
  amount,
  option,
  pfp,
  external_auth_provider_user_id,
  onClose,
}: {
  name: string;
  walletaddress: string;
  amount: number;
  option: { name: string };
  pfp: string;
  external_auth_provider_user_id: string;
  onClose: () => void;
}) {
  return (
    <Link href={getProfilePath(external_auth_provider_user_id)}>
      <div
        onClick={() => {
          onClose();
        }}
        className={`
          flex flex-row justify-between items-center
          w-full py-2 cursor-pointer
          border border-transparent
          hover:border-white/10 active:border-white/20
          hover:bg-slate-400/10 active:bg-slate-400/20
          px-1 rounded-lg transition-all
        `}
      >
        <div className="flex flex-row items-center">
          {pfp ? (
            <img
              src={pfp}
              alt={name}
              className="size-10 rounded-full object-cover "
            />
          ) : (
            <UserCircle
              className="size-10 rounded-full object-cover text-white/70"
              strokeWidth={2}
            />
          )}

          <div
            className="flex flex-col ml-2 max-w-[70%]"
          >
            <p
              style={{
                fontFamily: "Aeonik-Bold",
                fontSize: "18px",
                color: "white",
              }}
            >
              {name}
            </p>
            <p
              className="-mt-1"
              style={{
                fontFamily: "Aeonik-Bold",
                fontSize: "14px",
                color: "lightgray",
              }}
            >
              {shortenAddress(walletaddress)}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 10px",
            minWidth: "90px",
            marginRight: "5px",
            borderWidth: "1.5px",
            borderColor: "#212121",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              fontFamily: "Aeonik-Bold",
              color: "white",
            }}
          >
            ${(amount / 10 ** 6).toFixed(2)} {option.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
