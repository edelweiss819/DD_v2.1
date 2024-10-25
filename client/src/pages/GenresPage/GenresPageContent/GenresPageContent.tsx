import React from 'react';
import {GENRES, GENRES_DIR} from '../../../constants';
import styles from './GenresPageContent.module.scss'
import GenreLinkCard from './GenreLinkCard/GenreLinkCard.tsx';

const GenresPageContent: React.FC = () => {
    return (
        <section className={styles['content-container']}>
            <main>
                <div className={styles['title']}>Жанры</div>
                <div
                    className={styles['content']}>{Object.entries(GENRES).map(([genre, route],) => {
                    return (
                        <GenreLinkCard genre={genre} key={genre}
                                       route={GENRES_DIR + route}/>
                    )
                })}
                </div>
            </main>
        </section>
    );
};

export default GenresPageContent;
