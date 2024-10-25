import React from 'react';
import {Link} from 'react-router-dom';
import styles from './GenreLinkCard.module.scss'

export interface GenreLinkCardProps {
    genre: string;
    route: string;
}

const GenreLinkCard: React.FC<GenreLinkCardProps> = ({
                                                         genre,
                                                         route
                                                     }) => {
    return (
        <Link to={route} className={styles['card']}>
            {genre} &rarr;
        </Link>
    );
};

export default GenreLinkCard;
