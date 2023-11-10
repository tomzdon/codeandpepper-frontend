import { gql } from '@apollo/client';

export const RANDOM_ENTITY_DUEL = gql`
    query MyQuery($resourceType: ResourceType!) {
        randomEntityDuel(resourceType: $resourceType) {
            player1 {
                ... on Person {
                    id
                    name
                    mass
                    birthYear
                    gender
                    height
                }
                ... on Starship {
                    id
                    name
                    crew
                    model
                    length
                }
            }
            player2 {
                ... on Person {
                    id
                    name
                    mass
                    height
                    gender
                    birthYear
                }
                ... on Starship {
                    id
                    name
                    crew
                    length
                }
            }
            winner {
                ... on Person {
                    id
                    name
                }
                ... on Starship {
                    id
                    name
                }
            }
        }
    }
`;
