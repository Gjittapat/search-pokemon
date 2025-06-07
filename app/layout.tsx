// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

// Import the client‐side wrapper you just created:
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";

export const metadata = {
  title: "Search Pokémon App",
  description: "Next.js + Apollo Client demo using the Pokémon GraphQL API",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/*
          Wrap the entire application in ApolloProviderWrapper.
          Because that file is marked "use client", it can use React context.
        */}
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </body>
    </html>
  );
}
