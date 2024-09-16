import { useEffect } from "react"
import { useRouter } from "next/router"
import { useReferralStore } from "@/lib/stores/ReferralStore"

export function useCheckReferral() {
  const router = useRouter()
  const setReferralId = useReferralStore((state) => state.setReferralId)

  useEffect(() => {
    const ref = router.query.ref // Extract referral ID from query params

    if (ref) {
      setReferralId(ref) // Store the referral ID
    }
  }, [router.query.ref, setReferralId])
}
