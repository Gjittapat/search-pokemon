"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";

interface Props {
  children: ReactNode;
}

export default function ApolloProviderWrapper({ children }: Props) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
