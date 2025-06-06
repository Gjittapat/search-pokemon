"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { GET_POKEMON_BY_NAME } from "@/graphql/queries";

interface Props {
  name: string;
}

type Attack = { name: string; type: string; damage: number };
type Evolution = { id: string; number: string; name: string; image: string };

interface PokemonData {
  pokemon: {
    id: string;
    number: string;
    name: string;
    classification: string;
    types: string[];
    weight: { minimum: string; maximum: string };
    height: { minimum: string; maximum: string };
    image: string;
    attacks: { fast: Attack[]; special: Attack[] };
    evolutions?: Evolution[];
  } | null;
}

export default function PokemonResult({ name }: Props) {
  // If name is empty, skip the query
  const { data, loading, error } = useQuery<PokemonData>(GET_POKEMON_BY_NAME, {
    variables: { name },
    skip: !name,
    fetchPolicy: "cache-first",
  });

  if (!name) {
    return <p className="text-black">Type a name above to search.</p>;
  }
  if (loading) {
    return <p>Loading…</p>;
  }
  if (error || !data?.pokemon) {
    return (
      <p className="text-black">
        Pokémon <strong>{name}</strong> not found.
      </p>
    );
  }

  const p = data.pokemon;

  return (
    <div className="mt-4 border rounded-lg p-6 flex flex-col md:flex-row gap-6 bg-white shadow text-black">
      {/* Pokémon Image */}
      <div className="flex-shrink-0">
        <Image
          src={p.image}
          alt={p.name}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-black">
          {p.name} <span className="text-black">#{p.number}</span>
        </h2>
        <p className="mt-1 text-black">{p.classification}</p>
        <p className="mt-1">
          <strong>Types:</strong> {p.types.join(", ")}
        </p>
        <p className="mt-1">
          <strong>Weight:</strong> {p.weight.minimum} – {p.weight.maximum}
        </p>
        <p className="mt-1">
          <strong>Height:</strong> {p.height.minimum} – {p.height.maximum}
        </p>

        {/* Attacks */}
        <div className="mt-4">
          <h3 className="font-semibold">Fast Attacks:</h3>
          <ul className="list-disc pl-5">
            {p.attacks.fast.map((atk) => (
              <li key={atk.name}>
                {atk.name} ({atk.type}, Damage: {atk.damage})
              </li>
            ))}
          </ul>
          <h3 className="mt-2 font-semibold">Special Attacks:</h3>
          <ul className="list-disc pl-5">
            {p.attacks.special.map((atk) => (
              <li key={atk.name}>
                {atk.name} ({atk.type}, Damage: {atk.damage})
              </li>
            ))}
          </ul>
        </div>

        {/* Evolutions */}
        {p.evolutions && p.evolutions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-black">Evolutions:</h3>
            <div className="flex flex-wrap gap-4 mt-2 txt-black">
              {p.evolutions.map((ev) => (
                <Link
                  key={ev.id}
                  href={`/?name=${encodeURIComponent(ev.name.toLowerCase())}`}
                >
                  <div className="flex flex-col items-center hover:opacity-80">
                    <Image
                      src={ev.image}
                      alt={ev.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                    <span>{ev.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
