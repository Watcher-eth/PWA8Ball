import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
// import { relayStylePagination } from "@apollo/client/utilities"

export const POLYMARKET_GRAPH_ENDPOINT_URL =
  "https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/polymarket-orderbook-resync/prod/gn"

export const APOLLO_CLIENT = new ApolloClient({
  uri: POLYMARKET_GRAPH_ENDPOINT_URL,
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       tokens: relayStylePagination(),
    //     },
    //   },
    // },
  }),
})

if (process.env.NODE_ENV != "production") {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

export function GraphQlProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={APOLLO_CLIENT}>{children}</ApolloProvider>
}
