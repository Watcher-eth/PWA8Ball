// @ts-nocheck

import * as amplitude from "@amplitude/analytics-browser";

const Amplitude = amplitude.getInstance();

type MarketId = string;
type TopicId = string;
type CategoryId = string;
type UserId = string;
type SocialPlatform = string;
type Step = number;
type ItemType = "market" | "topic" | "user";
type ErrorType = string;
type Context = Record<string, unknown>;
type Filters = Record<string, unknown>;

// User clicks on / views a market
export const trackViewMarket = (marketId: MarketId, device: string) => {
  Amplitude.logEvent("View Market", { marketId, device });
};

// User makes a prediction
export const trackMakePrediction = (
  marketId: MarketId,
  amount: number,
  option: string,
  device: string
) => {
  Amplitude.logEvent("Make Prediction", { marketId, amount, option, device });
};

// User boosts a market
export const trackBoostMarket = (
  marketId: MarketId,
  boostAmount: number,
  device: string
) => {
  Amplitude.logEvent("Boost Market", { marketId, boostAmount, device });
};

// User joins a topic
export const trackJoinTopic = (topicId: TopicId, device: string) => {
  Amplitude.logEvent("Join Topic", { topicId, device });
};

// User clicks on a category
export const trackClickCategory = (categoryId: CategoryId, device: string) => {
  Amplitude.logEvent("Click Category", { categoryId, device });
};

// User clicks on a topic
export const trackClickTopic = (topicId: TopicId, device: string) => {
  Amplitude.logEvent("Click Topic", { topicId, device });
};

// User follows another user
export const trackFollowUser = (
  followedUserId: UserId,
  followerId: UserId,
  device: string
) => {
  Amplitude.logEvent("Follow User", { followedUserId, followerId, device });
};

// Onboarding steps
export const trackOnboardingStep = (
  marketId: MarketId,
  amount: number,
  option: string,
  device: string
) => {
  Amplitude.logEvent("User onramp", { marketId, amount, option, device });
};

// User onramp steps
export const trackOnramp = (step: Step, device: string) => {
  Amplitude.logEvent("Onboarding Step", { step, device });
};

// User connects socials
export const trackConnectSocials = (
  socialPlatform: SocialPlatform,
  device: string
) => {
  Amplitude.logEvent("Connect Socials", { socialPlatform, device });
};

// Steps for making a prediction
export const trackPredictionStep = (
  marketId: MarketId,
  step: Step,
  data: Record<string, unknown>,
  device: string
) => {
  Amplitude.logEvent("Prediction Step", { marketId, step, data, device });
};

// User goes on site (once a day or multiple times)
export const trackSiteVisit = (device: string) => {
  Amplitude.logEvent("Site Visit", { timestamp: new Date(), device });
};

// User login
export const trackUserLogin = (userId: UserId, device: string) => {
  Amplitude.logEvent("User Login", { userId, device });
};

// User search
export const trackSearch = (searchTerm: string, device: string) => {
  Amplitude.logEvent("Search", { searchTerm, device });
};

// Error events
export const trackErrorEvent = (
  errorType: ErrorType,
  context: Context,
  device: string
) => {
  Amplitude.logEvent("Error Event", { errorType, context, device });
};

// Item share
export const trackItemShare = (
  itemType: ItemType,
  itemId: string,
  device: string
) => {
  Amplitude.logEvent("Item Share", { itemType, itemId, device });
};

// Add comment
export const trackAddComment = (
  marketId: string,
  userId: string,
  device: string
) => {
  Amplitude.logEvent("Add Comment", { marketId, userId, device });
};

// Abandoned action
export const trackAbandonedAction = (
  actionType: string,
  itemId: string,
  device: string
) => {
  Amplitude.logEvent("Abandoned Action", { actionType, itemId, device });
};
