import React, { useCallback, useState } from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import type { Person } from '../../models/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericModal } from '../GenericModal/GenericModal';
import { PersonForm } from '../Forms/PersonForm';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON_MUTATION, GET_PEOPLE, UPDATE_PERSON_MUTATION } from '../../services/queries';
import { TypedMemo } from '../../utils';

interface PersonCardProps {
  person: Person;
}

const PersonCardComponent: React.FC<PersonCardProps> = ({ person }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [updatePerson] = useMutation(UPDATE_PERSON_MUTATION);
  const [deletePerson] = useMutation(DELETE_PERSON_MUTATION);

  const handleEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const saveUpdate = useCallback(
    (updatedPersonData: Person) => {
      updatePerson({
        variables: { input: updatedPersonData },
        refetchQueries: [{ query: GET_PEOPLE }],
      }).catch(console.error);
      closeEditModal();
    },
    [closeEditModal, updatePerson]
  );

  const handleDeleteConfirm = useCallback(() => {
    deletePerson({
      variables: { input: { id: person.id } },
      refetchQueries: [{ query: GET_PEOPLE }],
    }).catch(console.error);
    closeDeleteModal();
  }, [closeDeleteModal, deletePerson, person.id]);

  return (
    <>
      <GenericModal open={isEditModalOpen} onClose={closeEditModal} title="Edit card">
        <Typography>Edit Card for {person.name}</Typography>
        <PersonForm onSave={saveUpdate} person={person} />
      </GenericModal>
      <GenericModal open={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
        <Typography>Are you sure you want to delete {person.name}?</Typography>
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
          <Typography variant="h5">{person.name}</Typography>
          <Typography color="textSecondary">Birth year: {person.birthYear}</Typography>
          <Typography color="textSecondary">Gender: {person.gender}</Typography>
          <Typography color="textSecondary">Height: {person.height} cm</Typography>
          <Typography color="textSecondary">Mass: {person.mass} kg</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export const PersonCard = TypedMemo(PersonCardComponent);
