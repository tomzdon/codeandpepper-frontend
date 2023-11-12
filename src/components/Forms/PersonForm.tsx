import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import type { Person } from '../../models/types';

interface PersonFormProps {
  person?: Person;
  onSave: (data: Person) => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({ person, onSave }) => {
  const defaultFormData: Person = {
    name: '',
    birthYear: '',
    gender: '',
    height: 0,
    mass: 0,
    ...person,
  };

  const [formData, setFormData] = useState<Person>(defaultFormData);

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name ?? '',
        birthYear: person.birthYear ?? '',
        gender: person.gender ?? '',
        height: person.height ?? 0,
        mass: person.mass ?? 0,
        id: person.id ?? undefined,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [person]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField
        label="Birth Year"
        name="birthYear"
        value={formData.birthYear}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Height"
        name="height"
        type="number"
        value={formData.height}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mass"
        name="mass"
        type="number"
        value={formData.mass}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" color="primary">
        {person ? 'Save Changes' : 'Create Person'}
      </Button>
    </form>
  );
};
