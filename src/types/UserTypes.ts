export type User = {
  external_auth_provider_user_id: string
  name: string
  walletAddress: string
  pfp: string
  pointsBalance: number

  setState: (values: Partial<User>) => void
  reset: () => void
}
