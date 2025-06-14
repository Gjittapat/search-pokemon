# Search Pokémon App

A Next.js + TypeScript + Apollo Client application to search Pokémon by name or browse a directory, using the public Pokémon GraphQL API.

## Live Demo & Repo

- **Live demo (Vercel)**: https://search-pokemon-woad.vercel.app/

## Features & Highlights

- **Search by Name**: Home page search for any Pokémon by name; shows image, stats, attacks, and evolutions.
- **Pokémon Directory**: Browse the first N Pokémon with a “Show: [ N ] Pokémon” form, adjusting results dynamically.
- **React Suspense / Apollo**: Uses `useSuspenseQuery` in client components wrapped in `<Suspense>` for clean loading states.
- **Styling**: Tailwind CSS
- **Routing/Dynamic Routing**: `/pokemon/[name]` for details, `/pokemons` for directory.
- **TypeScript**: Typed GraphQL queries

## Quick Start

1. **Clone & install**
   ```bash
   git clone https://github.com/Gjittapat/search-pokemon.git
   cd search-pokemon
   yarn install
   ```
2. **Run dev server**
   ```bash
   yarn dev
   ```
3. **Build for production**
   ```bash
   yarn build
   yarn start
   ```
