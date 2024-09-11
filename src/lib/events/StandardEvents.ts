// @ts-nocheck
import * as amplitude from "@amplitude/analytics-browser"

const Amplitude = amplitude.getInstance()

type MarketId = string
type TopicId = string
type CategoryId = string
type UserId = string
type SocialPlatform = string
type Step = number
type ItemType = "market" | "topic" | "user"
type ErrorType = string
type Context = Record<string, unknown>
type Filters = Record<string, unknown>

async function logEventAsync(
  eventName: string,
  eventProperties: Record<string, unknown>
): Promise<void> {
  return new Promise((resolve, reject) => {
    Amplitude.logEvent(eventName, eventProperties, (response) => {
      if (response.code === 200) {
        resolve()
      } else {
        reject(
          new Error(`Amplitude logEvent failed with code: ${response.code}`)
        )
      }
    })
  })
}

// User clicks on / views a market
export async function trackViewMarket(
  marketId: MarketId,
  device: string
): Promise<void> {
  await logEventAsync("View Market", { marketId, device })
}

// User makes a prediction
export async function trackMakePrediction(
  marketId: MarketId,
  amount: number,
  option: string,
  device: string
): Promise<void> {
  await logEventAsync("Make Prediction", { marketId, amount, option, device })
}

// User boosts a market
export const trackBoostMarket = async (
  marketId: MarketId,
  boostAmount: number,
  device: string
): Promise<void> => {
  await logEventAsync("Boost Market", { marketId, boostAmount, device })
}

// User joins a topic
export const trackJoinTopic = async (
  topicId: TopicId,
  device: string
): Promise<void> => {
  await logEventAsync("Join Topic", { topicId, device })
}

// User clicks on a category
export const trackClickCategory = async (
  categoryId: CategoryId,
  device: string
): Promise<void> => {
  await logEventAsync("Click Category", { categoryId, device })
}

// User clicks on a topic
export const trackClickTopic = async (
  topicId: TopicId,
  device: string
): Promise<void> => {
  await logEventAsync("Click Topic", { topicId, device })
}

// User follows another user
export const trackFollowUser = async (
  followedUserId: UserId,
  followerId: UserId,
  device: string
): Promise<void> => {
  await logEventAsync("Follow User", { followedUserId, followerId, device })
}

// Onboarding steps
export const trackOnboardingStep = async (
  marketId: MarketId,
  amount: number,
  option: string,
  device: string
): Promise<void> => {
  await logEventAsync("User onramp", { marketId, amount, option, device })
}

// User onramp steps
export const trackOnramp = async (
  step: Step,
  device: string
): Promise<void> => {
  await logEventAsync("Onboarding Step", { step, device })
}

// User connects socials
export const trackConnectSocials = async (
  socialPlatform: SocialPlatform,
  device: string
): Promise<void> => {
  await logEventAsync("Connect Socials", { socialPlatform, device })
}

// Steps for making a prediction
export const trackPredictionStep = async (
  marketId: MarketId,
  step: Step,
  data: Record<string, unknown>,
  device: string
): Promise<void> => {
  await logEventAsync("Prediction Step", { marketId, step, data, device })
}

// User goes on site (once a day or multiple times)
export const trackSiteVisit = async (device: string): Promise<void> => {
  await logEventAsync("Site Visit", { timestamp: new Date(), device })
}

// User login
export const trackUserLogin = async (
  userId: UserId,
  device: string
): Promise<void> => {
  await logEventAsync("User Login", { userId, device })
}

// User search
export const trackSearch = async (
  searchTerm: string,
  device: string
): Promise<void> => {
  await logEventAsync("Search", { searchTerm, device })
}

// Error events
export const trackErrorEvent = async (
  errorType: ErrorType,
  context: Context,
  device: string
): Promise<void> => {
  await logEventAsync("Error Event", { errorType, context, device })
}

// Item share
export const trackItemShare = async (
  itemType: ItemType,
  itemId: string,
  device: string
): Promise<void> => {
  await logEventAsync("Item Share", { itemType, itemId, device })
}

// Add comment
export const trackAddComment = async (
  marketId: string,
  userId: string,
  device: string
): Promise<void> => {
  await logEventAsync("Add Comment", { marketId, userId, device })
}

// Abandoned action
export const trackAbandonedAction = async (
  actionType: string,
  itemId: string,
  device: string
): Promise<void> => {
  await logEventAsync("Abandoned Action", { actionType, itemId, device })
}
