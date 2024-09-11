import { useEffect } from "react"
import { useRouter } from "next/router"
import { useReferralStore } from "@/lib/stores/ReferralStore"

export function useCheckReferral() {
  const router = useRouter()
  const setReferralId = useReferralStore((state) => state.setReferralId)

  useEffect(() => {
    const ref = router.query.ref // For Next.js

    if (ref) {
      setReferralId(ref)
    }
  }, [router.query.ref, setReferralId])
}
