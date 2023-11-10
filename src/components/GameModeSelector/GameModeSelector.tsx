import React, {useEffect} from 'react';
import {ButtonGroup, Button} from '@mui/material';
import { ResourceType} from "../../models/types";

interface GameModeSelectorProps {
    setGameMode: (gameMode: ResourceType) => void
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({setGameMode}) => {


    useEffect(() => {
        const savedMode = localStorage.getItem('gameMode') as ResourceType;
        if (savedMode) {
            setGameMode(savedMode);
        }
    }, [setGameMode]);

    const handleModeChange = (mode: ResourceType) => {
        localStorage.setItem('gameMode', mode);
        setGameMode(mode);
    };

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => handleModeChange(ResourceType.PERSON)}>Person</Button>
            <Button onClick={() => handleModeChange(ResourceType.STARSHIP)}>Starship</Button>
        </ButtonGroup>
    );
};
