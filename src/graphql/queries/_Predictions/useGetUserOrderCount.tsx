import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const COUNT_ORDERS_QUERY = gql`
  query CountOrders($userAddress: String!) {
    orders_aggregate(where: { sender: { _eq: $userAddress } }) {
      aggregate {
        count
      }
    }
  }
`;

// Define TypeScript interfaces for the query result and variables
interface CountOrdersData {
  orders_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

interface CountOrdersVars {
  userAddress: string;
}

// Create a custom hook to use the GraphQL query
export const useGetUserOrderCount = (userAddress: string) => {
  const { data, loading, error } = useQuery<CountOrdersData, CountOrdersVars>(
    COUNT_ORDERS_QUERY,
    {
      variables: { userAddress },
    }
  );

  const orderCount = data?.orders_aggregate.aggregate.count || 0;

  return { orderCount, loading, error };
};
