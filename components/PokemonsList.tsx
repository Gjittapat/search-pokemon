// components/PokemonsList.tsx
"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { GET_POKEMONS } from "@/graphql/queries";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface PokemonSummary {
  id: string;
  number: string;
  name: string;
  classification: string;
  types: string[];
  image: string;
}

interface PokemonsData {
  pokemons: PokemonSummary[];
}
interface PokemonsVars {
  first: number;
}

export default function PokemonsList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read ?first= from URL, default to 20
  const param = searchParams.get("first");
  const parsed = param ? parseInt(param, 10) : NaN;
  const first = !isNaN(parsed) && parsed > 0 ? parsed : 20;

  // Local input state
  const [inputValue, setInputValue] = useState(first.toString());
  useEffect(() => {
    setInputValue(searchParams.get("first") || first.toString());
  }, [searchParams, first]);

  // Fetch the list
  const { data, loading, error } = useQuery<PokemonsData, PokemonsVars>(
    GET_POKEMONS,
    { variables: { first }, fetchPolicy: "cache-first" }
  );

  // Handlers
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseInt(inputValue.trim(), 10);
    if (n > 0) router.push(`/pokemons?first=${n}`);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Pokémon List</h2>
      <form onSubmit={onSubmit} className="flex gap-2 mb-6">
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={onChange}
          className="w-20 border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Load
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      {data?.pokemons.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.pokemons.map((p) => (
            <Link
              key={p.id}
              href={`/pokemon/${p.name.toLowerCase()}`}
              className="block border rounded-lg p-4 hover:shadow-md"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain mx-auto"
              />
              <h3 className="mt-2 text-lg font-medium text-center">
                {p.name} <span className="text-gray-500">#{p.number}</span>
              </h3>
              <p className="text-center text-sm text-gray-600">
                {p.classification}
              </p>
              <div className="mt-1 flex justify-center gap-1">
                {p.types.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-gray-200 rounded-full px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && <p>No Pokémon found.</p>
      )}
    </div>
  );
}
