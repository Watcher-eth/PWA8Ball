import { useState } from "react"

export function AppBanner() {
  const [isInstalled, setIsInstalled] = useState(false)

  const handleInstallClick = () => {
    // Handle the logic to check if the app is installed
    // For now, we'll simulate it with a state change
    setIsInstalled(true)
  }

  return (
    <div className="bg-[#101010]/[05] backdrop-blur-md text-white p-2.5  top-0 w-full z-50 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <img
          src="/icons/OrbLogo.png"
          alt="App Icon"
          className="w-9 h-9 rounded-md"
        />
        <div className="flex flex-col  ml-2 -space-y-1 text-left">
          <div className="text-[1.05rem] font-[Aeonik-Bold]">Glimpse</div>
          <div className="text-sm text-[lightgray] font-[Aeonik]">
            Download on IOS
          </div>
        </div>
      </div>
      <a
        href="https://testflight.apple.com/join/xBbJ2OPO"
        className="bg-[#007AFF] text-white px-4 py-1 font-[Aeonik-Bold] text-[0.95rem] rounded-full shadow hover:bg-blue-700"
        onClick={handleInstallClick}
      >
        {isInstalled ? "OPEN" : "VIEW"}
      </a>
    </div>
  )
}
