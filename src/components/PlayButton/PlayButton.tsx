import React from 'react';
import { Button } from '@mui/material';
import styles from './PlayButton.module.scss';

interface PlayButtonProps {
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <Button className={styles.playButton} onClick={onClick} variant="contained">
      Play
    </Button>
  );
};

export default PlayButton;
