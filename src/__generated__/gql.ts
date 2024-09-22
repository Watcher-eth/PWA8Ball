/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getMarketPrices($marketId: BigInt) {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n": types.GetMarketPricesDocument,
    "\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        createdAt\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n          walletAddress\n        }\n      }\n    }\n  }\n": types.FriendsOrdersByUserDocument,
    "\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n": types.GetLpPositionsDataDocument,
    "\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n": types.GetLpPositionOriginalValueUsdcDocument,
    "\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountUsdc\n        amountLp\n        marketId\n        createdAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n": types.GetUserLpDocument,
    "\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n": types.AllMarketsDocument,
    "\n  query CreatedMarketsByUserAddress($userAddress: String!) {\n    markets(where: { userAddress: $userAddress }) {\n      items {\n        createdAt\n        id\n        initialProb\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        question\n        proposedOutcome\n        resolved\n        title\n        topicId\n      }\n    }\n  }\n": types.CreatedMarketsByUserAddressDocument,
    "\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      marketId\n      createdAt\n      initialProb\n      liquidityTotal\n      liquidityBalanceUsdc\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n      userAddress\n    }\n  }\n": types.GetMarketByIdDocument,
    "\n  query MarketUsers($marketId: BigInt!) {\n    positions(where: { marketId: $marketId }) {\n      items {\n        option\n        tokensOwned\n        updatedAt\n        userAddress\n        user {\n          id\n          name\n          pfp\n          externalAuthProviderUserId\n          walletAddress\n        }\n      }\n    }\n  }\n": types.MarketUsersDocument,
    "\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n": types.OrderByIdDocument,
    "\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.FriendsOrdersDocument,
    "\n  query getPositionsByWallet($userAddress: String!) {\n    positions(where: { userAddress: $userAddress }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n          outcome\n          resolved\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.GetPositionsByWalletDocument,
    "\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n": types.UserOrderCountDocument,
    "\n  query userPositionsByMarket($marketId: BigInt, $userAddress: String) {\n    positions(where: { marketId: $marketId, userAddress: $userAddress }) {\n      items {\n        createdAt\n        marketId\n        option\n        tokensOwned\n      }\n    }\n  }\n": types.UserPositionsByMarketDocument,
    "\n  query SearchMarkets($question_contains: String!) {\n    markets(where: { question_contains: $question_contains }, limit: 10) {\n      items {\n        id\n        title\n        question\n        outcomeOddsA\n        outcomeA\n        marketId\n        topicId\n      }\n    }\n  }\n": types.SearchMarketsDocument,
    "\n  query searchUsers($name_contains: String!) {\n    users(where: { name_contains: $name_contains }) {\n      items {\n        name\n        pfp\n        id\n        walletAddress\n      }\n    }\n  }\n": types.SearchUsersDocument,
    "\n  query getMarketsForTopic($id: BigInt) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n": types.GetMarketsForTopicDocument,
    "\n  query getTopicById($id: BigInt!) {\n    topic(id: $id) {\n      creatorAddress\n      description\n      title\n      id\n    }\n  }\n": types.GetTopicByIdDocument,
    "\n  query getUserReferrals($referrerAddress: String!) {\n    referrals(where: { referrerAddress: $referrerAddress }) {\n      items {\n        feeAmount\n        id\n        marketId\n        referrerAddress\n        timestamp\n        market {\n          question\n          title\n        }\n      }\n    }\n  }\n": types.GetUserReferralsDocument,
    "\n  query getUserById($id: String!) {\n    user(id: $id) {\n      externalAuthProviderUserId\n      createdAt\n      name\n      pfp\n      walletAddress\n    }\n  }\n": types.GetUserByIdDocument,
};

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = tgql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function tgql(source: string): unknown;

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketPrices($marketId: BigInt) {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMarketPrices($marketId: BigInt) {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        createdAt\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n          walletAddress\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        createdAt\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n          walletAddress\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountUsdc\n        amountLp\n        marketId\n        createdAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountUsdc\n        amountLp\n        marketId\n        createdAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query CreatedMarketsByUserAddress($userAddress: String!) {\n    markets(where: { userAddress: $userAddress }) {\n      items {\n        createdAt\n        id\n        initialProb\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        question\n        proposedOutcome\n        resolved\n        title\n        topicId\n      }\n    }\n  }\n"): (typeof documents)["\n  query CreatedMarketsByUserAddress($userAddress: String!) {\n    markets(where: { userAddress: $userAddress }) {\n      items {\n        createdAt\n        id\n        initialProb\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        question\n        proposedOutcome\n        resolved\n        title\n        topicId\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      marketId\n      createdAt\n      initialProb\n      liquidityTotal\n      liquidityBalanceUsdc\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n      userAddress\n    }\n  }\n"): (typeof documents)["\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      marketId\n      createdAt\n      initialProb\n      liquidityTotal\n      liquidityBalanceUsdc\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n      userAddress\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query MarketUsers($marketId: BigInt!) {\n    positions(where: { marketId: $marketId }) {\n      items {\n        option\n        tokensOwned\n        updatedAt\n        userAddress\n        user {\n          id\n          name\n          pfp\n          externalAuthProviderUserId\n          walletAddress\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MarketUsers($marketId: BigInt!) {\n    positions(where: { marketId: $marketId }) {\n      items {\n        option\n        tokensOwned\n        updatedAt\n        userAddress\n        user {\n          id\n          name\n          pfp\n          externalAuthProviderUserId\n          walletAddress\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n"): (typeof documents)["\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getPositionsByWallet($userAddress: String!) {\n    positions(where: { userAddress: $userAddress }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n          outcome\n          resolved\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPositionsByWallet($userAddress: String!) {\n    positions(where: { userAddress: $userAddress }, limit: 15) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n          outcome\n          resolved\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query userPositionsByMarket($marketId: BigInt, $userAddress: String) {\n    positions(where: { marketId: $marketId, userAddress: $userAddress }) {\n      items {\n        createdAt\n        marketId\n        option\n        tokensOwned\n      }\n    }\n  }\n"): (typeof documents)["\n  query userPositionsByMarket($marketId: BigInt, $userAddress: String) {\n    positions(where: { marketId: $marketId, userAddress: $userAddress }) {\n      items {\n        createdAt\n        marketId\n        option\n        tokensOwned\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query SearchMarkets($question_contains: String!) {\n    markets(where: { question_contains: $question_contains }, limit: 10) {\n      items {\n        id\n        title\n        question\n        outcomeOddsA\n        outcomeA\n        marketId\n        topicId\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchMarkets($question_contains: String!) {\n    markets(where: { question_contains: $question_contains }, limit: 10) {\n      items {\n        id\n        title\n        question\n        outcomeOddsA\n        outcomeA\n        marketId\n        topicId\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query searchUsers($name_contains: String!) {\n    users(where: { name_contains: $name_contains }) {\n      items {\n        name\n        pfp\n        id\n        walletAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchUsers($name_contains: String!) {\n    users(where: { name_contains: $name_contains }) {\n      items {\n        name\n        pfp\n        id\n        walletAddress\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketsForTopic($id: BigInt) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMarketsForTopic($id: BigInt) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getTopicById($id: BigInt!) {\n    topic(id: $id) {\n      creatorAddress\n      description\n      title\n      id\n    }\n  }\n"): (typeof documents)["\n  query getTopicById($id: BigInt!) {\n    topic(id: $id) {\n      creatorAddress\n      description\n      title\n      id\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getUserReferrals($referrerAddress: String!) {\n    referrals(where: { referrerAddress: $referrerAddress }) {\n      items {\n        feeAmount\n        id\n        marketId\n        referrerAddress\n        timestamp\n        market {\n          question\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserReferrals($referrerAddress: String!) {\n    referrals(where: { referrerAddress: $referrerAddress }) {\n      items {\n        feeAmount\n        id\n        marketId\n        referrerAddress\n        timestamp\n        market {\n          question\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getUserById($id: String!) {\n    user(id: $id) {\n      externalAuthProviderUserId\n      createdAt\n      name\n      pfp\n      walletAddress\n    }\n  }\n"): (typeof documents)["\n  query getUserById($id: String!) {\n    user(id: $id) {\n      externalAuthProviderUserId\n      createdAt\n      name\n      pfp\n      walletAddress\n    }\n  }\n"];

export function tgql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;