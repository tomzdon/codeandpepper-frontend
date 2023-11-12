import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { mockSchema } from '../../../__mocks__/mockApollo';
import { GameArea } from '../GameArea';

const client = new ApolloClient({
  link: new SchemaLink({ schema: mockSchema }),
  cache: new InMemoryCache(),
});

describe('GameArea Component', () => {
  beforeEach(() => {
    render(
      <ApolloProvider client={client}>
        <GameArea />
      </ApolloProvider>
    );
  });

  test('renders GameArea component correctly', () => {
    expect(screen.getByAltText('Game')).toBeInTheDocument();
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
  });

  test('displays data from GraphQL correctly', async () => {
    fireEvent.click(screen.getByTestId('play-button'));
    await waitFor(
      () => {
        const massElements = screen.getAllByTestId('entity-mass');
        const isMassPresent = massElements.some((el) => el.textContent === 'Mass: 22');
        expect(isMassPresent).toBe(true);
      },
      { timeout: 4000 }
    );
  });
});
