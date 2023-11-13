import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import type { Starship } from '../../models/types';

interface StarshipFormProps {
  starship?: Starship;
  onSave: (data: Starship) => void;
}

export const StarshipForm: React.FC<StarshipFormProps> = ({ starship, onSave }) => {
  const defaultFormData = useMemo(
    () => ({
      name: '',
      model: '',
      crew: '',
      length: 0,
      ...starship,
    }),
    [starship]
  );
  const [formData, setFormData] = useState<Starship>(defaultFormData);

  useEffect(() => {
    if (starship) {
      setFormData({
        name: starship.name ?? '',
        model: starship.model ?? '',
        crew: starship.crew ?? '',
        length: starship.length ?? 0,
        id: starship.id ?? undefined,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [starship, defaultFormData]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let processedValue: string | number = value;
    if (name === 'length') {
      processedValue = parseFloat(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: processedValue,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSave(formData);
    },
    [formData, onSave]
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Crew" name="crew" value={formData.crew} onChange={handleChange} fullWidth margin="normal" />
      <TextField
        label="Length"
        name="length"
        type="number"
        value={formData.length}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" color="primary">
        Save Changes
      </Button>
    </form>
  );
};
