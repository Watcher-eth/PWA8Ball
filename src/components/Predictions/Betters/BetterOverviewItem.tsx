import Link from "next/link";
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
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "8px",
          marginBottom: "8px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={pfp}
            alt={name}
            style={{
              height: "45px",
              width: "45px",
              borderRadius: "22px",
              overflow: "hidden",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "7px",
              maxWidth: "70%",
            }}
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
