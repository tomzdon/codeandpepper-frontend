import React, { useCallback, useState } from 'react';
import { Switch, CircularProgress, FormControlLabel, Box, Grid, Button } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PERSON_MUTATION, CREATE_STARSHIP_MUTATION, GET_PEOPLE, GET_STARSHIPS } from '../../services/queries';
import { StarshipCard } from './StartshipCard';
import { PersonCard } from './PersonCard';
import type { Person, QueryData, Starship } from '../../models/types';
import { GenericModal } from '../GenericModal/GenericModal';
import { StarshipForm } from '../Forms/StarshipForm';
import { PersonForm } from '../Forms/PersonForm';
import { TypedMemo } from '../../utils';

const CardsComponent: React.FC = () => {
  const [showStarships, setShowStarships] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [createPerson] = useMutation(CREATE_PERSON_MUTATION);
  const [createStarship] = useMutation(CREATE_STARSHIP_MUTATION);
  const { loading, error, data } = useQuery<QueryData>(showStarships ? GET_STARSHIPS : GET_PEOPLE);

  const toggleCreateCardModal = useCallback(() => {
    setIsCreateModalOpen((prev) => !prev);
  }, []);

  const closeCreateCardModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleChangeCard = () => {
    setShowStarships((prev) => !prev);
  };

  const handleCreatePerson = useCallback(
    (newPersonData: Omit<Person, 'id'>) => {
      createPerson({
        variables: { input: newPersonData },
        refetchQueries: [{ query: GET_PEOPLE }],
        onCompleted: () => {
          closeCreateCardModal();
        },
      }).catch(console.error);
    },
    [closeCreateCardModal, createPerson]
  );

  const handleCreateStarship = useCallback(
    (newStarshipData: Omit<Starship, 'id'>) => {
      createStarship({
        variables: { input: newStarshipData },
        refetchQueries: [{ query: GET_STARSHIPS }],
        onCompleted: () => {
          closeCreateCardModal();
        },
      }).catch(console.error);
    },
    [closeCreateCardModal, createStarship]
  );

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const items = showStarships ? data?.listStarships.items : data?.listPeople.items;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Button variant="contained" color="primary" onClick={toggleCreateCardModal} sx={{ marginBottom: '20px' }}>
        Create New {showStarships ? 'Starship' : 'Person'}
      </Button>
      <FormControlLabel
        control={<Switch checked={showStarships} onChange={handleChangeCard} />}
        label={showStarships ? 'Starships' : 'People'}
      />
      <Grid container spacing={2} justifyContent="center">
        {items?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            {showStarships ? <StarshipCard starship={item as Starship} /> : <PersonCard person={item as Person} />}
          </Grid>
        ))}
      </Grid>
      <GenericModal
        open={isCreateModalOpen}
        onClose={toggleCreateCardModal}
        title={`Create New ${showStarships ? 'Starship' : 'Person'}`}
      >
        {showStarships ? <StarshipForm onSave={handleCreateStarship} /> : <PersonForm onSave={handleCreatePerson} />}
      </GenericModal>
    </Box>
  );
};

export const Cards = TypedMemo(CardsComponent);
