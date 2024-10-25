import React from 'react';
import styles from './OtherUsersProfilePageContent.module.scss';
import Button from '../../../shared/ui/Button/Button.tsx';
import {
    ButtonColor,
    ButtonType
} from '../../../shared/ui/Button/Button.enums.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import {useFetchOtherUser} from '../../../entities/users';
import OthersFavoriteArticlesList
    from './OthersFavoriteArticlesList/OthersFavoriteArticlesList.tsx';
import {useParams} from 'react-router';

const OtherUsersProfilePageContent: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const {index} = useParams();

    const {data: otherUser} = useFetchOtherUser(token!, [
        'favoriteArticles',
        'firstName'
    ], Number(index));

    const favoriteArticles = otherUser?.user.favoriteArticles;

    return (
        <section className={styles['main-section']}>
            <div className={styles['main-section-tabs']}>
                <div className={styles['main-section-tabs-container']}>
                    <Button text={'Любимые'} type={ButtonType.MEDIUM}
                            color={ButtonColor.BLUE}/>
                </div>
            </div>
            <div className={styles['main-section-content-container']}>
                {favoriteArticles && favoriteArticles.length > 0 ? (
                    <OthersFavoriteArticlesList articles={favoriteArticles}/>
                ) : (
                    <p>У пользователя нет любимых статей.</p>
                )}
            </div>
        </section>
    );
};

export default OtherUsersProfilePageContent;
