import React, { useCallback, useState } from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import type { Starship } from '../../models/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { DELETE_STRARSHIP_MUTATION, GET_STARSHIPS, UPDATE_STARSHIP_MUTATION } from '../../services/queries';
import { GenericModal } from '../GenericModal/GenericModal';
import { StarshipForm } from '../Forms/StarshipForm';

interface StarshipCardProps {
  starship: Starship;
}

export const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const [updateStarship] = useMutation(UPDATE_STARSHIP_MUTATION);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStarship] = useMutation(DELETE_STRARSHIP_MUTATION);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const saveUpdate = useCallback((updatedStarshipData: Starship) => {
    updateStarship({
      variables: { input: updatedStarshipData },
      onCompleted: () => {
        closeEditModal();
      },
      refetchQueries: [{ query: GET_STARSHIPS }],
    }).catch(console.error);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    deleteStarship({
      variables: { input: { id: starship.id } },
      refetchQueries: [{ query: GET_STARSHIPS }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        closeDeleteModal();
      },
    }).catch(console.error);
  }, [closeDeleteModal, deleteStarship]);

  return (
    <>
      <GenericModal open={isEditModalOpen} onClose={closeEditModal} title="Edit card">
        <Typography>Edit Card for {starship.name}</Typography>
        <StarshipForm onSave={saveUpdate} starship={starship} />
      </GenericModal>
      <GenericModal open={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
        <Typography>Are you sure you want to delete {starship.name}?</Typography>
        <Button onClick={handleDeleteConfirm} color="secondary">
          Delete
        </Button>
        <Button onClick={closeDeleteModal}>Cancel</Button>
      </GenericModal>
      <Card>
        <CardActions>
          <IconButton size="small" color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant="h5">{starship.name}</Typography>
          <Typography color="textSecondary">Model: {starship.model}</Typography>
          <Typography color="textSecondary">Załoga: {starship.crew}</Typography>
          <Typography color="textSecondary">Długość: {starship.length} m</Typography>
        </CardContent>
      </Card>
    </>
  );
};
