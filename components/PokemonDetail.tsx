"use client";

import { useSuspenseQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries";

interface Props {
  name: string;
}

export default function PokemonDetail({ name }: Props) {
  const { data } = useSuspenseQuery<{ pokemon: any }>(GET_POKEMON_BY_NAME, {
    variables: { name },
    fetchPolicy: "cache-first",
  });

  const p = data.pokemon as any;
  if (!p) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-gray-50 p-4">
        <p className="text-gray-700">Pokémon “{name}” not found.</p>
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          ← Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image */}
      <div className="w-full h-64 relative bg-gray-100">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      {/* Content */}
      <div className="p-8 space-y-6 text-gray-800">
        <h1 className="text-4xl font-bold tracking-tight">
          {p.name} <span className="text-gray-400">#{p.number}</span>
        </h1>
        <p className="text-lg">{p.classification}</p>

        <div className="flex flex-wrap gap-2">
          {p.types.map((t: string) => (
            <span
              key={t}
              className="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-medium">Weight</h2>
            <p>
              {p.weight.minimum} – {p.weight.maximum}
            </p>
          </div>
          <div>
            <h2 className="font-medium">Height</h2>
            <p>
              {p.height.minimum} – {p.height.maximum}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Fast Attacks</h2>
            <ul className="list-disc list-inside">
              {p.attacks.fast.map((atk: any) => (
                <li key={atk.name}>
                  {atk.name}{" "}
                  <span className="text-gray-500">
                    ({atk.type}, {atk.damage} dmg)
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Special Attacks</h2>
            <ul className="list-disc list-inside">
              {p.attacks.special.map((atk: any) => (
                <li key={atk.name}>
                  {atk.name}{" "}
                  <span className="text-gray-500">
                    ({atk.type}, {atk.damage} dmg)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {p.evolutions?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Evolutions</h2>
            <div className="mt-2 flex flex-wrap gap-6">
              {p.evolutions.map((ev: any) => (
                <Link
                  key={ev.id}
                  href={`/pokemon/${ev.name.toLowerCase()}`}
                  className="flex flex-col items-center hover:scale-105 transition"
                >
                  <Image
                    src={ev.image}
                    alt={ev.name}
                    width={96}
                    height={96}
                    className="object-contain rounded-lg bg-gray-100"
                    unoptimized
                  />
                  <span className="mt-2 font-medium">{ev.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
