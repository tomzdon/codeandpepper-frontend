import React, {useRef, useState, useEffect} from 'react';
import {Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import styles from './FlippedCard.module.scss';
import { Entity} from "../../models/types";

interface FlippedCardProps {
    frontImage: string;
    backImage: string;
    isBouncing: boolean;
    onBounceEnd: () => void;
    formattedJson: Entity | undefined;
}

export const FlippedCard: React.FC<FlippedCardProps> = ({
                                                            frontImage,
                                                            backImage,
                                                            isBouncing,
                                                            onBounceEnd,
                                                            formattedJson
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


    const cardClassName = `${styles.flipCardInner} ${isBouncing ? styles.flipCardBounce : ''} ${isFlipped ? styles.flipCardFlipped : ''}`;

    return (
        <div className={styles.flipCardContainer}>
            <div ref={cardRef} className={cardClassName} onAnimationEnd={onBounceEnd}>
                <Card className={styles.cardFront}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={frontImage}
                            alt="Front Side"
                        />
                    </CardActionArea>
                </Card>
                <Card className={styles.cardBack}>
                    <div className={styles.imageContainer}>
                        <CardMedia
                            component="img"
                            image={backImage}
                            alt="Back Side"
                        />
                    <Typography className={styles.overlayText} component="p">
                        {formattedJson?.name}
                    </Typography>
                    </div>
                </Card>
            </div>
        </div>
    );
};
