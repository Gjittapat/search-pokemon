"use client";

import dynamic from "next/dynamic";

// dynamically import the client component without SSR
const HomePageClient = dynamic(() => import("@/components/HomePageClient"), {
  ssr: false,
});

export default function HomePage() {
  return <HomePageClient />;
}
