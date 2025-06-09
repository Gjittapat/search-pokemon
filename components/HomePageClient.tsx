"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

export default function HomePageClient() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Browse All link */}
      <div className="w-full flex justify-end mb-6">
        <Link
          href="/pokemons"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Browse All Pokémon
        </Link>
      </div>
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
