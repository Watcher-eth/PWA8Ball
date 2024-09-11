import { useInitializeUser } from "@/hooks/useInitializeUser"

export function AuthChecker({ children }: { children: React.ReactNode }) {
  useInitializeUser() // Assuming these parameters

  return children
}
