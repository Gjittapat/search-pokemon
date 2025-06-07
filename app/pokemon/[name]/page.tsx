// app/pokemon/[name]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";

// Re-define the same query (or import from graphql/queries)
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

interface PageProps {
  params: { name: string };
}

export default async function PokemonPage({ params }: PageProps) {
  const name = params.name;

  // Fetch data at build time (static), cached by default
  const { data } = await apolloClient.query({
    query: GET_POKEMON_BY_NAME,
    variables: { name },
    fetchPolicy: "cache-first",
  });

  const p = data.pokemon;

  if (!p) {
    return (
      <main className="px-4 py-8 text-center">
        <h1 className="text-2xl">Pokémon “{name}” not found.</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        ← Back to search
      </Link>

      <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-6 bg-white shadow">
        <div className="flex-shrink-0">
          <Image
            src={p.image}
            alt={p.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {p.name} <span className="text-gray-500">#{p.number}</span>
          </h1>
          <p className="mb-2">{p.classification}</p>
          <p className="mb-2">
            <strong>Types:</strong> {p.types.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Weight:</strong> {p.weight.minimum} – {p.weight.maximum}
          </p>
          <p className="mb-2">
            <strong>Height:</strong> {p.height.minimum} – {p.height.maximum}
          </p>

          <div className="mt-4">
            <h2 className="font-semibold">Fast Attacks:</h2>
            <ul className="list-disc pl-5">
              {p.attacks.fast.map((atk: any) => (
                <li key={atk.name}>
                  {atk.name} ({atk.type}, Damage: {atk.damage})
                </li>
              ))}
            </ul>
            <h2 className="mt-2 font-semibold">Special Attacks:</h2>
            <ul className="list-disc pl-5">
              {p.attacks.special.map((atk: any) => (
                <li key={atk.name}>
                  {atk.name} ({atk.type}, Damage: {atk.damage})
                </li>
              ))}
            </ul>
          </div>

          {p.evolutions?.length ? (
            <div className="mt-4">
              <h2 className="font-semibold">Evolutions:</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {p.evolutions.map((ev: any) => (
                  <Link
                    key={ev.id}
                    href={`/pokemon/${ev.name.toLowerCase()}`}
                    className="flex flex-col items-center hover:opacity-80"
                  >
                    <Image
                      src={ev.image}
                      alt={ev.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                    <span>{ev.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
