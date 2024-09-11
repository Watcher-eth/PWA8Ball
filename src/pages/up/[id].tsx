// @ts-nocheck

import { MobiTop } from "@/components/layouts/MobiTop"
import { Receipt } from "@/components/share/UserPosition.tsx"
import { useGetPositionById } from "@/graphql/queries/positions/useGetPositionById"

export default function MarketPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { id } = params ?? {}
  const { data } = useGetPositionById(
    "10-0x8512B8f41a6D1f2Aa0D09ae710b705498735F265-0"
  )

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <img
        className="absolute top-0 w-full h-full"
        src="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
      />
      <div className="absolute top-0 w-full h-full backdrop-blur-xl backdrop-brightness-50" />
      <MobiTop
        desktop={
          <Receipt
            title={data?.position?.market?.title}
            points={
              data?.position?.tokensOwned * data?.position?.option === 0
                ? data?.position?.market?.outcomeOddsB / 1000
                : data?.position?.market?.outcomeOddsA / 1000
            }
            image="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
            options={[
              data?.position?.market?.outcomeA,
              data?.position?.market?.outcomeB,
            ]}
            option={data?.position?.option}
            id={data?.position.marketId}
            isDesktop
            question={data?.position?.market?.question}
          />
        }
        mobile={
          <Receipt
            title={data?.position?.market?.title}
            points={
              data?.position?.tokensOwned * data?.position?.option === 0
                ? data?.position?.market?.outcomeOddsB / 1000
                : data?.position?.market?.outcomeOddsA / 1000
            }
            image="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
            options={[
              data?.position?.market?.outcomeA,
              data?.position?.market?.outcomeB,
            ]}
            option={data?.position?.option}
            id={data?.position.marketId}
            question={data?.position?.market?.question}
          />
        }
      />
    </div>
  )
}
