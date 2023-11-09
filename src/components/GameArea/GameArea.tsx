import React from 'react';
import {Box} from '@mui/material';
import styles from './GameArea.module.scss';
import gameImage from '../../assets/images/moon.png';
import Card from "../Card/Card";


export const GameArea = () => {
    const cardsData = [
        {
            title: "Person Name",
            description: "This is a description for a person.",
            imageUrl: "../../assets/images/person.png",
        },
        {
            title: "Starship Name",
            description: "This is a description for a starship.",
            imageUrl: "../../assets/images/galactica.png",
        },
    ];
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="calc(100vh - 64px)"
            bgcolor="default"
        >
            <img src={gameImage} alt="Game" className={styles.gameImage}/>
            <Box display="flex" justifyContent="center" gap={4}>
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                    />
                ))}
            </Box>
        </Box>
    );
};

