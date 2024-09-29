import { ConnectButton } from "@rainbow-me/rainbowkit"


export const CustomConnectButton = ({
  label,
  iconSrc,
}: {
  label: string
  iconSrc: string
}) => {
  // const { openConnectModal } = useConnectModal()
  // const openConnectModal = () => {}
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        console.log({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        })
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            // aria-hidden={!ready}
            className={`
              w-full
              ${ready ? "" : "opacity-0 pointer-events-none select-none"}
            `}
            onClick={openConnectModal}
          >
            {!connected && (
              <button
                type="button"
                // disabled={!ready}
                className={`
                     w-full mb-4
                     hover:scale-101 active:scale-98 transition-all
                     cursor-pointer
                    `}
              >
                <div className="w-full rounded-md p-2 flex flex-row items-center border-2 border-[#181818] bg-[#151515] text-white">
                  <img src={iconSrc} className="size-5 mr-2" />
                  All Wallets
                </div>
              </button>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
