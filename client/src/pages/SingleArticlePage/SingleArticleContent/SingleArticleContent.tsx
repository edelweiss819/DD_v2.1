import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import styles from './SingleArticleContent.module.scss';
import Button from '../../../shared/ui/Button/Button';
import {
    ButtonType,
    ButtonColor
} from '../../../shared/ui/Button/Button.enums.ts';
import {
    decodeUserToken,
    generateLinkByGenre,
    splitContentIntoParagraphs
} from '../../../shared/utils';
import {GENRES_DIR} from '../../../constants';
import UserAvatar
    from '../../../entities/users/components/UserAvatar/UserAvatar';
import {useFetchUserAvatar} from '../../../entities/users';
import AuthorLink from '../../../shared/ui/AuthorLink/AuthorLink';
import DeleteConfirmationModal
    from '../../../shared/ui/Modals/BaseModal/DeleteConfirmationModal/DeleteConfirmationModal.tsx';

const SingleArticleContent: React.FC = () => {
    const {singleArticle} = useSelector((state: RootState) => state.singleArticle);
    const {token} = useSelector((state: RootState) => state.user);
    const paragraphs = singleArticle?.content ? splitContentIntoParagraphs(singleArticle.content, 10) : [];
    const {data: avatarData} = useFetchUserAvatar(singleArticle.author?.index);
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const avatarUrl = avatarData?.avatarUrl || 'defaultAvatar';
    const userIndex = avatarData?.userIndex || -1;

    const handleDeleteButtonClick = () => {
        setDeleteModalOpen(true);
        // console.log(deleteModalOpen)
    }


    useEffect(() => {
        if (token) {
            const decodedToken = decodeUserToken(token);
            const currentUserRole = decodedToken.role;
            const currentUserIndex = decodedToken.index;

            if (singleArticle.author?.index &&
                (currentUserRole === 'admin' || currentUserIndex === singleArticle.author.index)) {
                setCanDelete(true);
            }
        }
    }, [
                  token,
                  singleArticle.author
              ]);


    return (
        <main className={styles['main-section']}>
            <div className={styles['main-section-content-container']}>
                {singleArticle.content ? <>
                    {(canDelete) && (
                        <div
                            className={styles['main-section-content-container-delete-button-block']}>
                            <Button text={'Удалить'} type={ButtonType.MEDIUM}
                                    color={ButtonColor.DARK_BLUE}
                                    onClick={handleDeleteButtonClick}/>
                        </div>)
                    }
                    <div
                        className={styles['main-section-content-container-author-block']}>
                        {singleArticle.author ? (
                            <>
                                <UserAvatar avatarUrl={avatarUrl}
                                            userIndex={userIndex}/>
                                <AuthorLink index={singleArticle.author.index}
                                            name={singleArticle.author.name}/>
                            </>
                        ) : (
                            <span>Автор не найден.</span>
                        )}
                    </div>
                    <div
                        className={styles['main-section-content-container-genres-block']}>
                        {singleArticle.genres?.map((genre: string) => (
                            <Button
                                text={genre}
                                type={ButtonType.ROUNDED_SMALL}
                                color={ButtonColor.GREY}
                                key={genre}
                                to={`${GENRES_DIR}${generateLinkByGenre(genre)}`}
                            />
                        ))}
                    </div>
                    <article
                        className={styles['main-section-content-container-single-article']}>
                        {paragraphs.map((paragraph, index) => (
                            <p className={styles.paragraph}
                               key={index}>{paragraph}</p>
                        ))}
                    </article>
                </> : <div
                    className={styles['main-section-content-container-error']}>
                    Такой статьи не существует.
                </div>
                }
            </div>
            {deleteModalOpen && (
                <DeleteConfirmationModal closeSetter={setDeleteModalOpen}/>)}
        </main>

    );
};

export default SingleArticleContent;
