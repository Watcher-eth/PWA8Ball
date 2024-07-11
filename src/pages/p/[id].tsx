// @ts-nocheck
import { Predictions } from "@/components/Predictions";
import { useRouter } from "next/router";


export default function MarketPage({ params, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Predictions id={id} />
    </>
  );
}
