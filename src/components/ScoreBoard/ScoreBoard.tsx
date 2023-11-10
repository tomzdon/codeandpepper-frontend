import React, { useEffect, useState } from 'react';
import { DuelResult } from '../../models/types';
import { Box, Typography } from '@mui/material';

interface ScoreBoardProps {
  result: DuelResult | undefined;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ result }) => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  useEffect(() => {
    if (result === undefined) {
      return;
    }
    if (result.winner.id === result.player1.id) {
      setPlayer1Score(player1Score + 1);
    } else if (result.winner.id === result.player2.id) {
      setPlayer2Score(player2Score + 1);
    }
  }, [result]);

  return (
    <Box sx={{ position: 'absolute', top: 70, right: 16, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" component="div">
        Score Board
      </Typography>
      <Typography variant="body1">Player 1: {player1Score}</Typography>
      <Typography variant="body1">Player 2: {player2Score}</Typography>
    </Box>
  );
};
