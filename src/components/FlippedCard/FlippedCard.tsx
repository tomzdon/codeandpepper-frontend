import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import styles from './FlippedCard.module.scss';

import type { Entity } from '../../models/types';
import { TypedMemo } from '../../utils';

interface FlippedCardProps {
  frontImage: string;
  backImage: string;
  isBouncing: boolean;
  onBounceEnd: () => void;
  entityDetails: Entity | undefined;
}

const FlippedCardComponent: React.FC<FlippedCardProps> = ({
  frontImage,
  backImage,
  isBouncing,
  onBounceEnd,
  entityDetails,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName.includes('bounce')) {
        setIsFlipped(true);
      }
    };

    cardElement?.addEventListener('animationend', handleAnimationEnd);

    if (isBouncing) {
      setIsFlipped(false);
    }

    return () => {
      cardElement?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isBouncing]);

  const cardClassName = `${styles.flipCardInner} ${isBouncing ? styles.flipCardBounce : ''} ${
    isFlipped ? styles.flipCardFlipped : ''
  }`;

  const renderEntityDetails = useMemo(() => {
    if (entityDetails === undefined || entityDetails === null) {
      return null;
    }

    switch (entityDetails.__typename) {
      case 'Person':
        return <Typography data-testid="entity-mass">{`Mass: ${entityDetails.mass}`}</Typography>;
      case 'Starship':
        return <Typography data-testid="entity-crew">{`Crew: ${entityDetails.crew}`}</Typography>;
      default:
        return null;
    }
  }, [entityDetails]);

  return (
    <div className={styles.flipCardContainer}>
      <div ref={cardRef} className={cardClassName} onAnimationEnd={onBounceEnd} data-testid="flip-card">
        <Card className={styles.cardFront}>
          <CardActionArea>
            <CardMedia component="img" image={frontImage} alt="Front Side" data-testid="front-image" />
          </CardActionArea>
        </Card>
        <Card className={styles.cardBack}>
          <div className={styles.imageContainer}>
            <CardMedia component="img" image={backImage} alt="Back Side" style={{ opacity: 0.8 }} />
            <div className={styles.overlayText}>{renderEntityDetails}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const FlippedCard = TypedMemo(FlippedCardComponent);
