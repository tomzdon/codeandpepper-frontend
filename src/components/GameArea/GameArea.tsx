import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import styles from './GameArea.module.scss';
import gameImage from '../../assets/images/moon.png';
import {GameModeSelector} from '../GameModeSelector/GameModeSelector';
import {FlippedCard} from "../FlippedCard/FlippedCard";
import Galatica from '../../assets/images/galactica.png'
import Person from '../../assets/images/person.png'
import PersonBattle from '../../assets/images/personBattle.png'
import StarshipBattle from '../../assets/images/starship.png'
import {DuelResult, GameMode, RandomEntityDuelQuery} from "../../models/types";
import PlayButton from "../PlayButton/PlayButton";
import {useLazyQuery, useQuery} from '@apollo/client';
import {RANDOM_ENTITY_DUEL} from "../../services/queries";

export const GameArea = () => {
    const [getBattleResult, {data, loading, error}] = useLazyQuery<RandomEntityDuelQuery>(RANDOM_ENTITY_DUEL, {
        variables: {resourceType: "PERSON"},
    });
    const [formattedJson, setFormattedJson] = useState<DuelResult | null>(null);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.Person);
    const [isBouncing, setIsBouncing] = useState(false);

    const handleBounceEnd = () => {
        setIsBouncing(false);
    };

    const handleFlip = () => {
        getBattleResult()
        setIsBouncing(true);
    };
    useEffect(() => {
        if (data && !loading && !error) {
            setFormattedJson(data.randomEntityDuel);
        }
    }, [data, loading, error]);

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
                        <FlippedCard frontImage={Person} backImage={PersonBattle} onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing} formattedJson={formattedJson?.player1}/>
                        <FlippedCard frontImage={Person} backImage={PersonBattle} onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing} formattedJson={formattedJson?.player2}/>
                    </>
                )}

                {gameMode === GameMode.Starship && (
                    <>
                        <FlippedCard frontImage={Galatica} backImage={StarshipBattle} onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing} formattedJson={formattedJson?.player1}/>
                        <FlippedCard frontImage={Galatica} backImage={StarshipBattle} onBounceEnd={handleBounceEnd}
                                     isBouncing={isBouncing} formattedJson={formattedJson?.player2}/>
                    </>
                )}
            </Box>
            <PlayButton onClick={handleFlip}/>
        </Box>
    );
};

