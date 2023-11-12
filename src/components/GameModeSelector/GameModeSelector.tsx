import React, { useCallback, useEffect } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { ResourceType } from '../../models/types';
import { TypedMemo } from '../../utils';

interface GameModeSelectorProps {
  setGameMode: (gameMode: ResourceType) => void;
  gameMode: ResourceType;
}

const GameModeSelectorComponent: React.FC<GameModeSelectorProps> = ({ setGameMode, gameMode }) => {
  useEffect(() => {
    const savedMode = localStorage.getItem('gameMode') as ResourceType;
    if (savedMode) {
      setGameMode(savedMode);
    }
  }, [setGameMode]);

  const handleModeChangePerson = useCallback(() => {
    localStorage.setItem('gameMode', ResourceType.PERSON);
    setGameMode(ResourceType.PERSON);
  }, [setGameMode]);

  const handleModeChangeStarship = useCallback(() => {
    localStorage.setItem('gameMode', ResourceType.STARSHIP);
    setGameMode(ResourceType.STARSHIP);
  }, [setGameMode]);

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={handleModeChangePerson}
        style={{ backgroundColor: gameMode === ResourceType.PERSON ? 'red' : undefined }}
      >
        Person
      </Button>
      <Button
        onClick={handleModeChangeStarship}
        style={{ backgroundColor: gameMode === ResourceType.STARSHIP ? 'red' : undefined }}
      >
        Starship
      </Button>
    </ButtonGroup>
  );
};

export const GameModeSelector = TypedMemo(GameModeSelectorComponent);
