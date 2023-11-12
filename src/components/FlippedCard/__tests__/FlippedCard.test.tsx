import React from 'react';
import { render } from '@testing-library/react';
import type { Entity } from '../../../models/types';
import { FlippedCard } from '../FlippedCard';

describe('FlippedCard', () => {
  const frontImage = 'front.jpg';
  const backImage = 'back.jpg';

  const mockPerson: Entity = {
    __typename: 'Person',
    name: 'John Doe',
    birthYear: '1980',
    gender: 'male',
    height: 180,
    mass: 70,
  };

  const mockStarship: Entity = {
    __typename: 'Starship',
    name: 'Star Cruiser',
    model: 'SC-201',
    crew: '100',
    length: 300,
  };

  it('renders with the front image', () => {
    const { getByTestId } = render(
      <FlippedCard
        frontImage={frontImage}
        backImage={backImage}
        isBouncing={false}
        onBounceEnd={() => {}}
        entityDetails={mockPerson}
      />
    );

    expect(getByTestId('front-image')).toHaveAttribute('src', frontImage);
  });

  it('displays entity details correctly', () => {
    const { getByTestId, rerender } = render(
      <FlippedCard
        frontImage={frontImage}
        backImage={backImage}
        isBouncing={false}
        onBounceEnd={() => {}}
        entityDetails={mockPerson}
      />
    );

    expect(getByTestId('entity-mass')).toHaveTextContent(`Mass: ${mockPerson.mass}`);

    rerender(
      <FlippedCard
        frontImage={frontImage}
        backImage={backImage}
        isBouncing={false}
        onBounceEnd={() => {}}
        entityDetails={mockStarship}
      />
    );

    expect(getByTestId('entity-crew')).toHaveTextContent(`Crew: ${mockStarship.crew}`);
  });

  it('renders correctly when entityDetails is undefined', () => {
    const { getByTestId, queryByTestId } = render(
      <FlippedCard
        frontImage={frontImage}
        backImage={backImage}
        isBouncing={false}
        onBounceEnd={() => {}}
        entityDetails={undefined}
      />
    );

    expect(getByTestId('flip-card')).toBeInTheDocument();

    expect(queryByTestId('entity-mass')).toBeNull();
    expect(queryByTestId('entity-crew')).toBeNull();
  });
});
