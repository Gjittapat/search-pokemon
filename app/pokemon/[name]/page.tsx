/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      classification
      types
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        image
      }
    }
  }
`;

export default async function PokemonPage({ params }: { params: any }) {
  const name = params.name as string;
  const { data } = await apolloClient.query({
    query: GET_POKEMON_BY_NAME,
    variables: { name },
    fetchPolicy: "cache-first",
  });

  const p = data.pokemon as any;
  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            Pokémon “{name}” not found
          </h1>
          <Link href="/" className="inline-block text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <Link
        href="/"
        className="self-start mb-6 text-blue-600 font-medium hover:underline"
      >
        ← Back to home
      </Link>

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="w-full h-64 relative">
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain bg-gray-100"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {p.name} <span className="text-gray-400">#{p.number}</span>
          </h1>
          <p className="text-lg text-gray-600">{p.classification}</p>

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

          <div className="grid grid-cols-2 gap-4 text-gray-700">
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
              <h2 className="text-xl font-semibold text-gray-800">
                Fast Attacks
              </h2>
              <ul className="list-disc list-inside text-gray-700">
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
              <h2 className="text-xl font-semibold text-gray-800">
                Special Attacks
              </h2>
              <ul className="list-disc list-inside text-gray-700">
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
              <h2 className="text-xl font-semibold text-gray-800">
                Evolutions
              </h2>
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
                    <span className="mt-2 text-gray-700 font-medium">
                      {ev.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
