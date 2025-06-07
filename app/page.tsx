// app/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import PokemonResult from "@/components/PokemonResult";

export default function HomePage() {
  // Read the current ?name= from the URL
  const searchParams = useSearchParams();
  const name = searchParams?.get("name") ?? "";

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Pokémon by Name</h1>
      {/* The input form that updates ?name= */}
      <SearchInput />
      {/* The result component that shows data or “not found” */}
      <PokemonResult name={name} />
    </main>
  );
}
