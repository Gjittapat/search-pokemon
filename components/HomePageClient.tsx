"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";

export default function HomePageClient() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Welcome to Pokémon Search!
        </h1>
        <p className="mt-2 text-gray-600 max-w-md">
          Discover stats, evolutions, and more for all your favorite Pokémon.
        </p>
      </div>
      {/* Search form */}
      <div className="mb-8">
        <SearchInput />
      </div>
    </main>
  );
}
