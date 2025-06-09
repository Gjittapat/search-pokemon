"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { GET_POKEMONS } from "@/graphql/queries";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("first");
  const first = param ? parseInt(param, 10) : 20;
  const [inputValue, setInputValue] = useState(first.toString());

  useEffect(() => {
    setInputValue(searchParams.get("first") || first.toString());
  }, [searchParams, first]);

  const { data, loading, error } = useQuery<PokemonsData, PokemonsVars>(
    GET_POKEMONS,
    { variables: { first }, fetchPolicy: "cache-first" }
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseInt(inputValue.trim(), 10);
    if (n > 0) router.push(`/pokemons?first=${n}`);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-[Fredoka_One] text-4xl font-extrabold text-gray-900 tracking-tight">
          Pokémon Directory
        </h1>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Browse the first <strong>{first}</strong> Pokémon, or load a different
          number.
        </p>
      </div>

      {/* Load Form */}
      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6 flex gap-4 text-black"
      >
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={onChange}
          className="w-24 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          Load
        </button>
      </form>

      {/* Error / Loading */}
      {loading && <p className="text-center text-gray-700">Loading Pokémon…</p>}
      {error && (
        <p className="text-center text-red-600">Error: {error.message}</p>
      )}

      {/* Grid */}
      {data?.pokemons.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.pokemons.map((p) => (
            <Link
              key={p.id}
              href={`/pokemon/${p.name.toLowerCase()}`}
              className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="bg-gray-100 p-4">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={120}
                  height={120}
                  className="object-contain mx-auto"
                  unoptimized
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {p.name}{" "}
                  <span className="text-gray-400 font-normal">#{p.number}</span>
                </h2>
                <p className="mt-1 text-sm text-gray-600">{p.classification}</p>
                <div className="mt-2 flex justify-center gap-2 flex-wrap">
                  {p.types.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-700">No Pokémon found.</p>
        )
      )}
    </main>
  );
}
