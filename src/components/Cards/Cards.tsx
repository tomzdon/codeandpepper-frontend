import React, { useCallback, useEffect, useState } from 'react';
import { Switch, CircularProgress, Pagination, FormControlLabel, Box, Grid, Button } from '@mui/material';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_PERSON_MUTATION, CREATE_STARSHIP_MUTATION, GET_PEOPLE, GET_STARSHIPS } from '../../services/queries';
import { StarshipCard } from './StartshipCart';
import { PersonCard } from './PersonCard';

import type { Person, QueryData, Starship } from '../../models/types';
import { GenericModal } from '../GenericModal/GenericModal';
import { StarshipForm } from '../Forms/StarshipForm';
import { PersonForm } from '../Forms/PersonForm';

export const Cards: React.FC = () => {
  const [showStarships, setShowStarships] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [createPerson] = useMutation(CREATE_PERSON_MUTATION);
  const [createStarship] = useMutation(CREATE_STARSHIP_MUTATION);
  const [fetchData, { loading, error, data }] = useLazyQuery<QueryData>(showStarships ? GET_STARSHIPS : GET_PEOPLE);

  const openCreateCardModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);
  const closeCreateCardModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  useEffect(() => {
    fetchData({ variables: { limit: 3, nextToken } }).catch(console.error);
  }, [fetchData, nextToken, showStarships]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setNextToken(showStarships ? data?.listStarships.nextToken : data?.listPeople.nextToken);

    fetchData({ variables: { limit: 3, nextToken } }).catch(console.error);
  };

  const handleChangeCard = useCallback(() => {
    setShowStarships(!showStarships);
    setPage(1);
    setNextToken(undefined);
  }, [setShowStarships, showStarships]);

  const handleCreatePerson = (newPersonData: Omit<Person, 'id'>) => {
    createPerson({
      variables: { input: newPersonData },
      onCompleted: () => {
        closeCreateCardModal();
        fetchData().catch(console.error);
      },
    }).catch(console.error);
  };

  const handleCreateStarship = (newStarshipData: Omit<Starship, 'id'>) => {
    createStarship({
      variables: { input: newStarshipData },
      onCompleted: () => {
        closeCreateCardModal();
        fetchData().catch(console.error);
      },
    }).catch(console.error);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const items = showStarships ? data?.listStarships.items : data?.listPeople.items;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Button variant="contained" color="primary" onClick={openCreateCardModal} sx={{ marginBottom: '20px' }}>
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
      <Pagination count={3} page={page} onChange={handlePageChange} sx={{ marginTop: '20px' }} />
      <GenericModal
        open={isCreateModalOpen}
        onClose={closeCreateCardModal}
        title={`Create New ${showStarships ? 'Starship' : 'Person'}`}
      >
        {showStarships ? <StarshipForm onSave={handleCreateStarship} /> : <PersonForm onSave={handleCreatePerson} />}
      </GenericModal>
    </Box>
  );
};
