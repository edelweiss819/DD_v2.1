import React, {useState} from 'react';
import styles from './ProfilePageContent.module.scss';
import Button from '../../../shared/ui/Button/Button.tsx';
import {
    ButtonColor,
    ButtonType
} from '../../../shared/ui/Button/Button.enums.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import {decodeUserToken, timestampToLocalDate} from '../../../shared/utils';
import {useFetchUser} from '../../../entities/users';
import FavoriteArticlesList
    from './FavoriteArticlesList/FavoriteArticlesList.tsx';
import LastArticlesList from './LastArticlesList/LastArticlesList.tsx';


const ProfilePageContent: React.FC = () => {
    const [isFavoriteViewMode, setIsFavoriteViewMode] = useState<boolean>(true);

    const {
        token,
        favoriteArticles,
        lastArticles
    } = useSelector((state: RootState) => state.user);

    const decodedUserToken = decodeUserToken(token!);
    const decodedCurrentUserIndex = decodedUserToken.index;
    const userRole = decodedUserToken.role;


    useFetchUser(token!, [
        'lastArticles',
        'favoriteArticles'
    ], decodedCurrentUserIndex);

    const sortedLastArticles = Array.isArray(lastArticles) ? lastArticles.slice().sort((a,
                                                                                        b) => {
        return b.timestamp - a.timestamp;
    }) : [];

    const articlesGroupedByDate: {
        [date: string]: typeof sortedLastArticles
    } = {};

    sortedLastArticles.forEach(article => {
        const dateKey = timestampToLocalDate(article.timestamp);
        if (!articlesGroupedByDate[dateKey]) {
            articlesGroupedByDate[dateKey] = [];
        }
        articlesGroupedByDate[dateKey].push(article);
    });

    return (
        <section className={styles['main-section']}>
            <div className={styles['main-section-tabs']}>
                <div className={styles['main-section-tabs-container']}>
                    <Button text={'Любимые'} type={ButtonType.MEDIUM}
                            color={ButtonColor.BLUE}
                            onClick={() => setIsFavoriteViewMode(true)}/>
                    <Button text={'Последние'} type={ButtonType.MEDIUM}
                            color={ButtonColor.DARK_BLUE}
                            onClick={() => setIsFavoriteViewMode(false)}/>
                    {userRole === 'admin' &&
						<Button text={'Админ панель'} type={ButtonType.MEDIUM}
								color={ButtonColor.GREY}
								to={'/admin-panel'}/>}
                </div>
            </div>
            <div className={styles['main-section-content-container']}>
                {isFavoriteViewMode ? (
                    favoriteArticles.length > 0 ? (
                        <FavoriteArticlesList articles={favoriteArticles}/>
                    ) : (
                        <p>У вас еще нет любимых статей.</p>
                    )
                ) : (
                    <LastArticlesList
                        articlesGroupedByDate={articlesGroupedByDate}/>
                )}
            </div>
        </section>
    );
};

export default ProfilePageContent;
