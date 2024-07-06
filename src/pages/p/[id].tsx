// @ts-nocheck
import Bet from "@/components/Predictions";
import React from "react";
import { useRouter } from "next/router";


export default function MarketPage({ params, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Bet id={id} />
    </>
  );
}
