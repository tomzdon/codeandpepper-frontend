export enum GameMode {
    Person = 'Person',
    Starship = 'Starship',
}

export enum ResourceType {
    PERSON = "PERSON",
    STARSHIP = "STARSHIP",
}

export type Person = {
    __typename: "Person";
    id: string;
    name: string;
    birthYear: string;
    gender: string;
    height: number;
    mass: number;
};

export type Starship = {
    __typename: "Starship";
    id: string;
    name: string;
    model: string;
    length: number;
    crew: string;
};

export type Entity = Person | Starship;

export type DuelResult = {
    player1: Entity;
    player2: Entity;
    winner: Entity;
};

export type RandomEntityDuelQuery = {
    randomEntityDuel: DuelResult;
};
