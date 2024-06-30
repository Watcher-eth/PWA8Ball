import amplitude from "amplitude-js";

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
export const trackViewMarket = (marketId: MarketId) => {
  Amplitude.logEvent("View Market", { marketId });
};

// User makes a prediction
export const trackMakePrediction = (
  marketId: MarketId,
  amount: number,
  option: string
) => {
  Amplitude.logEvent("Make Prediction", { marketId, amount, option });
};

// User boosts a market
export const trackBoostMarket = (marketId: MarketId, boostAmount: number) => {
  Amplitude.logEvent("Boost Market", { marketId, boostAmount });
};

// User joins a topic
export const trackJoinTopic = (topicId: TopicId) => {
  Amplitude.logEvent("Join Topic", { topicId });
};

// User clicks on a category
export const trackClickCategory = (categoryId: CategoryId) => {
  Amplitude.logEvent("Click Category", { categoryId });
};

// User clicks on a topic
export const trackClickTopic = (topicId: TopicId) => {
  Amplitude.logEvent("Click Topic", { topicId });
};

// User follows another user
export const trackFollowUser = (followedUserId: UserId) => {
  Amplitude.logEvent("Follow User", { followedUserId });
};

// Onboarding steps
export const trackOnboardingStep = (
  marketId: MarketId,
  amount: number,
  option: string
) => {
  Amplitude.logEvent("User onramp", { marketId, amount });
};

// User onramp steps
export const trackOnramp = (step: Step) => {
  Amplitude.logEvent("Onboarding Step", { step });
};

// User connects socials
export const trackConnectSocials = (socialPlatform: SocialPlatform) => {
  Amplitude.logEvent("Connect Socials", { socialPlatform });
};

// Steps for making a prediction
export const trackPredictionStep = (
  marketId: MarketId,
  step: Step,
  data: Record<string, unknown>
) => {
  Amplitude.logEvent("Prediction Step", { marketId, step, data });
};

// User goes on site (once a day or multiple times)
export const trackSiteVisit = () => {
  Amplitude.logEvent("Site Visit", { timestamp: new Date() });
};

// User login
export const trackUserLogin = (userId: UserId) => {
  Amplitude.logEvent("User Login", { userId });
};

// User search
export const trackSearch = (searchTerm: string, filters: Filters) => {
  Amplitude.logEvent("Search", { searchTerm, filters });
};

// Error events
export const trackErrorEvent = (errorType: ErrorType, context: Context) => {
  Amplitude.logEvent("Error Event", { errorType, context });
};

// Item share
export const trackItemShare = (itemType: ItemType, itemId: string) => {
  Amplitude.logEvent("Item Share", { itemType, itemId });
};

// Add comment
export const trackAddComment = (itemType: ItemType, itemId: string) => {
  Amplitude.logEvent("Add Comment", { itemType, itemId });
};

// Abandoned action
export const trackAbandonedAction = (actionType: string, itemId: string) => {
  Amplitude.logEvent("Abandoned Action", { actionType, itemId });
};
