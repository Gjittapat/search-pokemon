import { gql } from "@apollo/client";

export const GET_POKEMON_BY_NAME = gql`
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
