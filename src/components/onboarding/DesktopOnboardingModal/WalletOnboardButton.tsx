import { useConnect } from "wagmi"
import { WAGMI_CONNECTORS } from "@/wagmiConfig"

export function WalletOnboardButton({
  label,
  iconSrc,
  onClick,
}: {
  label: string
  iconSrc: string
  onClick: () => void
}) {
  const { connectors, connect } = useConnect()
  return (
    <button
      type="button"
      // disabled={!ready}
      onClick={() => {
        console.log("clicked connect")
        connect({ connector: WAGMI_CONNECTORS[0] })
      }}
      className={`
        w-full mb-4
          hover:scale-101 active:scale-98 transition-all
        cursor-pointer
      `}
    >
      <div className="w-full rounded-md p-2 flex flex-row items-center border-2 border-[#181818] bg-[#151515] text-white">
        <img src={iconSrc} className="size-5 mr-2" />
        {label === "coinbase" ? "Coinbase Smart Wallet" : label}
      </div>
    </button>
  )
}
