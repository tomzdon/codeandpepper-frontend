export enum ResourceType {
  PERSON = 'PERSON',
  STARSHIP = 'STARSHIP',
}

export interface Person {
  __typename: 'Person';
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  height: number;
  mass: number;
}

export interface Starship {
  __typename: 'Starship';
  id: string;
  name: string;
  model: string;
  length: number;
  crew: string;
}

export type Entity = Person | Starship;

export interface DuelResult {
  player1: Entity;
  player2: Entity;
  winner: Entity;
}

export interface RandomEntityDuelQuery {
  randomEntityDuel: DuelResult;
}
