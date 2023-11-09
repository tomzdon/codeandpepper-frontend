import React, {useEffect, useState} from 'react';
import {ButtonGroup, Button} from '@mui/material';
import {GameMode} from "../../models/types";

interface GameModeSelectorProps {
    setGameMode: (gameMode: GameMode) => void
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({setGameMode}) => {


    useEffect(() => {
        // Load the game mode from localStorage on component mount
        const savedMode = localStorage.getItem('gameMode') as GameMode;
        if (savedMode) {
            setGameMode(savedMode);
        }
    }, []);

    const handleModeChange = (mode: GameMode) => {
        localStorage.setItem('gameMode', mode);
        setGameMode(mode);
    };

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => handleModeChange(GameMode.Person)}>Person</Button>
            <Button onClick={() => handleModeChange(GameMode.Starship)}>Starship</Button>
        </ButtonGroup>
    );
};
