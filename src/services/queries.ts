import { gql } from '@apollo/client';

export const RANDOM_ENTITY_DUEL = gql`
    query getResulBattle($resourceType: ResourceType!) {
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

export const GET_STARSHIPS = gql`
    query GetCardStarship($limit: Int, $nextToken: String) {
        listStarships(limit: $limit, nextToken: $nextToken) {
            items {
                crew
                id
                length
                model
                name
            }
            nextToken
        }
    }
`;

export const GET_PEOPLE = gql`
    query GetCardsPeople($limit: Int, $nextToken: String) {
        listPeople(limit: $limit, nextToken: $nextToken) {
            items {
                birthYear
                gender
                height
                id
                mass
                name
            }
            nextToken
        }
    }
`;

export const UPDATE_PERSON_MUTATION = gql`
    mutation UpdatePersonCard($input: UpdatePersonInput!) {
        updatePerson(input: $input) {
            name
            birthYear
            gender
            height
            mass
        }
    }
`;

export const UPDATE_STARSHIP_MUTATION = gql`
    mutation UpdateStarshipCard($input: UpdateStarshipInput!) {
        updateStarship(input: $input) {crew id length model name}

    }
`
export const DELETE_PERSON_MUTATION = gql`
    mutation DeletePerson($input: DeletePersonInput!) {
        deletePerson(input: $input) {
            id
        }
    }
`
export const DELETE_STRARSHIP_MUTATION = gql`
    mutation DeleteStarship($input: DeleteStarshipInput!) {
        deleteStarship(input: $input) {
            id
        }
    }
`
export const CREATE_PERSON_MUTATION = gql`
    mutation CreatePerson($input: CreatePersonInput!) {
        createPerson(input: $input) {
            id
        }
    }
`;

export const CREATE_STARSHIP_MUTATION = gql`
    mutation CreateStarship($input: CreateStarshipInput!) {
        createStarship(input: $input) {
            id
        }
    }
`;
