import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styles from './GameArea.module.scss';
import gameImage from '../../assets/images/moon.png';
import { GameModeSelector } from '../GameModeSelector/GameModeSelector';
import { FlippedCard } from '../FlippedCard/FlippedCard';
import Galatica from '../../assets/images/galactica.png';
import Person from '../../assets/images/person.png';
import PersonBattle from '../../assets/images/personBattle.png';
import StarshipBattle from '../../assets/images/starship.png';
import PlayButton from '../PlayButton/PlayButton';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_ENTITY_DUEL } from '../../services/queries';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { ResourceType } from '../../models/types';

import type { DuelResult, RandomEntityDuelQuery } from '../../models/types';
import { TypedMemo } from '../../utils';

const GameAreaComponent: React.FC = () => {
  const [gameResult, setGameResult] = useState<DuelResult | undefined>(undefined);
  const [gameMode, setGameMode] = useState<ResourceType>(ResourceType.PERSON);
  const [isBouncing, setIsBouncing] = useState(false);
  const [getBattleResult, { data, error }] = useLazyQuery<RandomEntityDuelQuery>(RANDOM_ENTITY_DUEL, {
    fetchPolicy: 'no-cache',
  });

  const handleBounceEnd = useCallback(() => {
    setIsBouncing(false);
  }, []);

  const handleFlip = useCallback(() => {
    getBattleResult({ variables: { resourceType: gameMode } }).catch(console.error);
    setIsBouncing(true);
  }, [gameMode, getBattleResult]);

  useEffect(() => {
    if (!isBouncing && data) {
      setGameResult(data.randomEntityDuel);
    }
  }, [isBouncing, data]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 300px)"
      className={styles.gameArea}
    >
      <ScoreBoard result={gameResult} />
      <img src={gameImage} alt="Game" className={styles.gameImage} />
      <GameModeSelector setGameMode={setGameMode} gameMode={gameMode} />
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} className={styles.cardsContainer}>
        {gameMode === ResourceType.PERSON && (
          <>
            <FlippedCard
              frontImage={Person}
              backImage={PersonBattle}
              onBounceEnd={handleBounceEnd}
              isBouncing={isBouncing}
              entityDetails={data?.randomEntityDuel?.player1}
            />
            <FlippedCard
              frontImage={Person}
              backImage={PersonBattle}
              onBounceEnd={handleBounceEnd}
              isBouncing={isBouncing}
              entityDetails={data?.randomEntityDuel?.player2}
            />
          </>
        )}

        {gameMode === ResourceType.STARSHIP && (
          <>
            <FlippedCard
              frontImage={Galatica}
              backImage={StarshipBattle}
              onBounceEnd={handleBounceEnd}
              isBouncing={isBouncing}
              entityDetails={data?.randomEntityDuel?.player1}
            />
            <FlippedCard
              frontImage={Galatica}
              backImage={StarshipBattle}
              onBounceEnd={handleBounceEnd}
              isBouncing={isBouncing}
              entityDetails={data?.randomEntityDuel?.player2}
            />
          </>
        )}
      </Box>
      <PlayButton data-testid="play-button" onClick={handleFlip} />
      {error && <span data-testid="error">{error.message}</span>}
    </Box>
  );
};
export const GameArea = TypedMemo(GameAreaComponent);
