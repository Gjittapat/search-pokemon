import "./globals.css";
import { ReactNode } from "react";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";

export const metadata = {
  title: "Search Pokémon App",
  description: "Next.js + Apollo Client demo using the Pokémon GraphQL API",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </body>
    </html>
  );
}
