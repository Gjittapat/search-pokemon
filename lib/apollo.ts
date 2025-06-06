import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app/";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});
