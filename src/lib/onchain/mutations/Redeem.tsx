// @ts-nocheck

import { useMutation } from "@tanstack/react-query"




export const useRedeem = () => {
  return useMutation({
    mutationFn: redeemPrediction,
    onSuccess: () => {
      console.log("Redeemed successfully")
    },
    onError: (error) => {
      console.error("Error redeeming", error)
    },
  })
}
