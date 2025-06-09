"use client";

import { Suspense, use as reactUse } from "react";
import Link from "next/link";
import PokemonDetail from "@/components/PokemonDetail";

export default function PokemonPage({ params }: any) {
  // Unwrap params, then assert its shape
  const resolved = reactUse(params) as { name: string };
  const name = resolved.name.toLowerCase();

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      {/* Back link */}
      <Link
        href="/"
        className="self-start mb-6 text-blue-600 font-medium hover:underline"
      >
        ← Back to home
      </Link>

      {/* Suspense boundary */}
      <Suspense
        fallback={
          <div className="py-16 text-gray-500 text-center">
            Loading Pokémon details…
          </div>
        }
      >
        <PokemonDetail name={name} />
      </Suspense>
    </main>
  );
}
