import React from 'react';
import {Card as MuiCard, CardContent, CardMedia, Typography} from '@mui/material';
import Galatica from '../../assets/images/galactica.png'
interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({title, description, imageUrl}) => {
    return (
        <MuiCard>
            <CardMedia
                component="img"
                height="140"
                image={Galatica}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </MuiCard>
    );
};

export default Card;
