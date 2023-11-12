import React from 'react';
import { Button } from '@mui/material';
import styles from './PlayButton.module.scss';
import { TypedMemo } from '../../utils';

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButtonComponent: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <Button data-testid="play-button" className={styles.playButton} onClick={onClick} variant="contained">
      Play
    </Button>
  );
};

export const PlayButton = TypedMemo(PlayButtonComponent);
