// import { useQuery } from "@apollo/client" // import { gql } from here for untyped queries
// import { gql } from "@/__generated__/gql"; // for typed queries


// const TYPED_EXAMPLE_MARKET_QUERY = gql(/* GraphQL */`
//   query ExampleOnchainMarket($id: BigInt!) {
//     onchainMarket(id: $id) {
//       id
//       outcomeA
//       outcomeB
//       usdcStake
//       liquidityUSDC
//       resolved
//       outcome
//       proposedOutcome
//       initialProb
//       createdAt
//       updatedAt
//       resolvedAt
//       proposedAt
//     }
//   }
// `)


// // const UNTYPED_EXAMPLE_MARKET_QUERY = gql`
// //   query OnchainMarkets($id: BigInt!) {
// //     onchainMarkets(id: $id) {
// //       id
// //       outcomeA
// //       outcomeB
// //       usdcStake
// //       liquidityUSDC
// //       resolved
// //       outcome
// //       proposedOutcome
// //       initialProb
// //       createdAt
// //       updatedAt
// //       resolvedAt
// //       proposedAt
// //     }
// //   }
// // `


// export function useExampleQuery() {
//   const { data, loading, error } = useQuery(TYPED_EXAMPLE_MARKET_QUERY, {
//     variables: { id: 1 },
//   });
//   return data?.onchainMarket;
// }