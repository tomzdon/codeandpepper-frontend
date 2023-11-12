import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

export const typeDefs = `
 type Query {
    randomEntityDuel(resourceType: ResourceType!): DuelResult
}

  type DuelResult {
    player1: Entity
    player2: Entity
    winner: Entity
  }

  type Person {
    id: String
    name: String
    birthYear: String
    gender: String
    height: Int
    mass: Int
  }

  type Starship {
    id: String
    name: String
    model: String
    length: Int
    crew: String
  }

  union Entity = Person | Starship
  
  enum ResourceType {
    PERSON
    STARSHIP
}
`;

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  Query: () => ({
    randomEntityDuel: () => ({
      player1: { name: 'John Doe', birthYear: '1992-07-13', gender: 'male', height: 11, mass: 22, __typename:'Person' },
      player2: { name: ' Doe', birthYear: '1992-07-13', gender: 'male', height: 13, mass: 21 ,__typename:'Person'},
      winner: { name: 'John Doe', birthYear: '1992-07-13', gender: 'male', height: 11, mass: 22 ,__typename:'Person'},
    }),
  }),
};

export const mockSchema = addMocksToSchema({
  schema,
  mocks,
});
