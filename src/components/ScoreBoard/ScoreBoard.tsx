import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import type { DuelResult } from '../../models/types';

interface ScoreBoardProps {
  result: DuelResult | undefined;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ result }) => {
  const [player1Score, setPlayer1Score] = useState(() => {
    return parseInt(localStorage.getItem('player1Score') ?? '0', 10);
  });
  const [player2Score, setPlayer2Score] = useState(() => {
    return parseInt(localStorage.getItem('player2Score') ?? '0', 10);
  });

  useEffect(() => {
    if (result === undefined) {
      return;
    }
    if (result.winner.id === result.player1.id) {
      setPlayer1Score((prevScore) => {
        const newScore = prevScore + 1;
        localStorage.setItem('player1Score', newScore.toString());
        return newScore;
      });
    } else if (result.winner.id === result.player2.id) {
      setPlayer2Score((prevScore) => {
        const newScore = prevScore + 1;
        localStorage.setItem('player2Score', newScore.toString());
        return newScore;
      });
    }
  }, [result]);

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    localStorage.setItem('player1Score', '0');
    localStorage.setItem('player2Score', '0');
  };

  return (
    <Box sx={{ position: 'absolute', top: 70, right: 16, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" component="div">
        Score Board
      </Typography>
      <Typography variant="body1">Player 1: {player1Score}</Typography>
      <Typography variant="body1">Player 2: {player2Score}</Typography>
      <Button onClick={resetGame} variant="contained" size="small" color="primary" style={{ marginTop: 20 }}>
        Reset Game
      </Button>
    </Box>
  );
};
