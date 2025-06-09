"use client";

import { Suspense } from "react";
import PokemonsGrid from "@/components/PokemonGrid";

export default function PokemonsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <Suspense
        fallback={
          <div className="py-16 text-gray-500 text-center">
            Loading Pokémon directory…
          </div>
        }
      >
        <PokemonsGrid />
      </Suspense>
    </main>
  );
}
