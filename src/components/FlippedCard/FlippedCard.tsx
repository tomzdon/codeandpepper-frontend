import React, {useRef, useState, useEffect, useMemo} from 'react';
import {Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import styles from './FlippedCard.module.scss';
import {Entity} from "../../models/types";

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

    const renderEntityDetails = useMemo(() => {
        if (!formattedJson) {
            return null;
        }

        if (formattedJson.__typename === "Person") {
            return <Typography>{`Mass: ${formattedJson.mass}`}</Typography>;
        } else if (formattedJson.__typename === "Starship") {
            return <Typography>{`Crew: ${formattedJson.crew}`}</Typography>;
        }

        return null;
    }, [formattedJson]);

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
                            style={{opacity: 0.8}}
                        />
                        <Typography className={styles.overlayText} component="p">
                            {renderEntityDetails}
                        </Typography>
                    </div>
                </Card>
            </div>
        </div>
    );
};
