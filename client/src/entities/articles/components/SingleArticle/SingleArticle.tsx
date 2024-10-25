import React from 'react';
import {IArticle} from '../../model';
import {truncateText} from '../../../../shared/utils';
import styles from './SingleArticle.module.scss';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {
    ButtonType,
    ButtonColor
} from '../../../../shared/ui/Button/Button.enums.ts';
import {setCurrentArticleIndex} from '../../slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store.ts';
import StarFavArticleIcon
    from '../../../../assets/FavIcons/StarFavArticleIcon.tsx';
import {useToggleFavArticleStatus} from '../../hooks';
import {useFetchUserAvatar} from '../../../users';
import UserAvatar
    from '../../../users/components/UserAvatar/UserAvatar.tsx';
import AuthorLink from '../../../../shared/ui/AuthorLink/AuthorLink.tsx';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                               genres,
                                               index,
                                               author
                                           }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        favoriteArticles,
        token: userToken,
        isAuthorized
    } = useSelector(
        (state: RootState) => state.user
    );

    // Fetch avatar data for the author
    const {data: avatarData} = useFetchUserAvatar(author.index);
    const avatarUrl = avatarData?.avatarUrl || 'defaultAvatar';
    const userIndex = avatarData?.userIndex || -1;

    const isFavorite = () => {
        return favoriteArticles.some(article => Number(article.index) === index);
    };

    const handleButtonClick = () => {
        if (index) {
            dispatch(setCurrentArticleIndex(index));
        }
    };

    const mutation = useToggleFavArticleStatus();

    const handleFavIconClick = async () => {
        if (!userToken) {
            console.error('User token is not available');
            return; // Return to prevent further execution
        }

        try {
            await mutation.mutateAsync({
                                           index,
                                           token: userToken,
                                       });
        } catch (error) {
            console.error('Ошибка при изменении статуса избранного:', error);
        }
    };

    return (
        <div className={styles['single-article-container']}>
            {avatarData && (
                <div className={styles['single-article-title']}>
                        <span
                            className={styles['single-article-title-avatar-container']}>
                            <UserAvatar avatarUrl={avatarUrl}
                                        userIndex={userIndex}/>
                        </span>
                    <div>
                        "{title}" от&nbsp;
                        <AuthorLink index={author.index} name={author.name}/>
                    </div>

                </div>
            )}
            <div className={styles['single-article-genres']}>
                {genres?.join(', ').toUpperCase()}
            </div>
            <div className={styles['single-article-content']}>
                {content && truncateText(content)}
            </div>
            <div className={styles['single-article-button-container']}>
                {isAuthorized && (
                    isFavorite() ? (
                        <div
                            className={styles['single-article-button-container-fav-block']}>
                            <div
                                className={styles['single-article-button-container-fav-block-fav-icon']}>
                                <StarFavArticleIcon color={'#FFD700'}
                                                    onClick={handleFavIconClick}/>
                            </div>
                            <span
                                className={styles['single-article-button-container-fav-block-text']}>
                                Уже в избранном
                            </span>
                        </div>
                    ) : (
                        <div
                            className={styles['single-article-button-container-fav-block']}>
                            <div
                                className={styles['single-article-button-container-fav-block-fav-icon']}>
                                <StarFavArticleIcon
                                    onClick={handleFavIconClick}/>
                            </div>
                            <span
                                className={styles['single-article-button-container-fav-block-text']}>
                                Добавить в избранное
                            </span>
                        </div>
                    )
                )}
                <Button
                    text={'ЧИТАТЬ'}
                    type={ButtonType.ROUNDED_SMALL}
                    color={ButtonColor.BLUE}
                    to={`/articles/${index}`}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );
};

export default SingleArticle;
