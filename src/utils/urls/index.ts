


const BASE_URL = "https://tryglimpse.xyz"

const PWA_URL = "https://pwa-8-ball.vercel.app"


export const HOME_PATH = "/"
export const ACTIVITY_PATH = "/activity"

export const LEADERBOARD_PATH = "/leaderboard"

export const SETTINGS_PATH = "/settings"

export function getTopicPath(topicId: string) {
  return `/t/${topicId}` as const;
}

export function getProfilePath(userId: string) {
  return `/u/${userId}` as const;
}

export function getMarketPath(id: string) {
  return `/p/${id}` as const;
}

export function getMarketPreviewUrl(id: string) {
  return `${BASE_URL}/api/marketPreview?id=${id}` as const;
}

export function getProfileUrl(userId: string) {
  return `${PWA_URL}${getProfilePath(userId)}` as const;
}

export function getMarketUrl(id: string) {
  return `${BASE_URL}${getMarketPath(id)}` as const;
}


export function getTopicUrl(topicId: string) {
  return `${PWA_URL}${getTopicPath(topicId)}` as const;
}

const OG_API_PATH = "/api/og"

export const OG_API_SPLASH_URL = `${PWA_URL}${OG_API_PATH}/splash`


export function getApiOgRouteUrl(userId: string) {
  return `${PWA_URL}${OG_API_PATH}/route?id=${userId}` as const
}

export function getApiOgTopicUrl(topicId: string) {
  return `${PWA_URL}${OG_API_PATH}/topic?id=${topicId}` as const
}

// export function getApiOgSplashUrl() {
//   return `${PWA_URL}${OG_API_PATH}/splash`
// }