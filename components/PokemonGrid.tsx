"use client";

import { useSuspenseQuery } from "@apollo/client";
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

export default function PokemonsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read ?first= from URL, default to 20
  const param = searchParams.get("first");
  const parsed = param ? parseInt(param, 10) : NaN;
  const first = !isNaN(parsed) && parsed > 0 ? parsed : 20;

  // Local form state
  const [inputValue, setInputValue] = useState(first.toString());
  useEffect(() => {
    setInputValue(searchParams.get("first") || first.toString());
  }, [searchParams, first]);

  // Handlers
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseInt(inputValue.trim(), 10);
    if (n > 0) {
      router.push(`/pokemons?first=${n}`);
    }
  };

  // Suspense-enabled fetch
  const { data } = useSuspenseQuery<PokemonsData, PokemonsVars>(GET_POKEMONS, {
    variables: { first },
    fetchPolicy: "cache-first",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back to home */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block text-blue-600 hover:underline font-medium"
        >
          ← Back to home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-[Fredoka_One] text-3xl font-extrabold text-gray-900 tracking-tight">
          Pokémon Directory
        </h1>
      </div>

      {/* Load Form */}
      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 text-black"
      >
        <label htmlFor="count" className="whitespace-nowrap">
          Show:
        </label>
        <input
          id="count"
          type="number"
          min="1"
          value={inputValue}
          onChange={onChange}
          className="w-20 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
        />
        <span>Pokémon</span>
        <button
          type="submit"
          className="ml-auto bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          Load
        </button>
      </form>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.pokemons.map((p) => (
          <Link
            key={p.id}
            href={`/pokemon/${p.name.toLowerCase()}`}
            className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            {/* Image */}
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

            {/* Info */}
            <div className="p-4 text-center text-gray-800">
              <h2 className="text-lg font-semibold">
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
    </div>
  );
}
