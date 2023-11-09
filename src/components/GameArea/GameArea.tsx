import React, {useState} from 'react';
import {Box} from '@mui/material';
import styles from './GameArea.module.scss';
import gameImage from '../../assets/images/moon.png';
import {GameModeSelector} from '../GameModeSelector/GameModeSelector';
import {FlippedCard} from "../FlippedCard/FlippedCard";
import Galatica from '../../assets/images/galactica.png'
import Person from '../../assets/images/person.png'
import {GameMode} from "../../models/types";
import PlayButton from "../PlayButton/PlayButton";

export const GameArea = () => {
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.Person);
    const [isBouncing, setIsBouncing] = useState(false);

    const handleBounceEnd = () => {
        console.log("->a ", );
        setIsBouncing(false); // Stop the bounce animation
    };

    const handleFlip = () => {
        setIsBouncing(true); // Start the bounce animation
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="calc(100vh - 300px)"
            className={styles.gameArea}
        >
            <img src={gameImage} alt="Game" className={styles.gameImage}/>
            <GameModeSelector setGameMode={setGameMode}/>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                className={styles.cardsContainer}
            >
                {gameMode === GameMode.Person && (
                    <>
                        <FlippedCard frontImage={Person} backContent="Person Details" onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing}/>
                        <FlippedCard frontImage={Person} backContent="Person Details" onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing}/>
                    </>
                )}

                {gameMode === GameMode.Starship && (
                    <>
                        <FlippedCard frontImage={Galatica} backContent="Person Details" onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing}/>
                        <FlippedCard frontImage={Galatica} backContent="Person Details" onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing}/>
                    </>
                )}
            </Box>
            <PlayButton onClick={handleFlip}/>
        </Box>
    );
};

