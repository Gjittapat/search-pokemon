// app/pokemons/page.tsx

"use client";

import dynamic from "next/dynamic";

// Dynamically import without SSR so useSearchParams() is only called in the browser
const PokemonsListClient = dynamic(() => import("@/components/PokemonsList"), {
  ssr: false,
});

export default function PokemonsPage() {
  return <PokemonsListClient />;
}
