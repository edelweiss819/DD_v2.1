import React, {useEffect, useState} from 'react';
import styles from './WheelPageContent.module.scss';
import Wheel from '../../../entities/wheel/components/Wheel.tsx';
import {
    useFetchRandomArticlesList,
    useFetchSingleArticleByIndex
} from '../../../entities/articles';
import ArticleLink from '../../../shared/ui/ArticleLink/ArticleLink.tsx';
import Button from '../../../shared/ui/Button/Button.tsx';
import {
    ButtonType,
    ButtonColor
} from '../../../shared/ui/Button/Button.enums.ts';

const WheelPageContent: React.FC = () => {

    useEffect(() => {
        document.title = 'DD || Колесо';
    }, []);
    const [winningArticleIndex, setWinningArticleIndex] = useState<number | undefined>(undefined);

    const {
        data: article,
    } = useFetchSingleArticleByIndex(winningArticleIndex);
    const {
        data,
        refetch
    } = useFetchRandomArticlesList();

    const fetchedRandomArticles = data?.randomArticlesList ?? [];


    const [winningArticleList, setWinningArticleList] = useState<{
        index: number;
        title: string;
    }[]>([]);

    useEffect(() => {
        if (winningArticleIndex !== undefined && article) {
            const isAlreadyAdded = winningArticleList.some(
                (winningArticle) => winningArticle.index === winningArticleIndex
            );

            if (!isAlreadyAdded) {
                setWinningArticleList((prevList) => [
                    ...prevList,
                    {
                        index: winningArticleIndex,
                        title: article.article.title
                    }
                ]);
            }
        }
    }, [
                  winningArticleList,
                  winningArticleIndex,
                  article
              ]);

    const handleUpdateWheelButtonClick = () => {
        refetch()
    }


    return (
        <div className={styles['content']}>
            <div className={styles['content-button-block']}>
                <Button text={'Обновить колесо'} type={ButtonType.MEDIUM}
                        color={ButtonColor.BLUE}
                        onClick={handleUpdateWheelButtonClick}/>
            </div>
            <Wheel setWinningArticleIndex={setWinningArticleIndex}
                   fetchedRandomArticles={fetchedRandomArticles}/>
            <div className={styles['content-article-list-container']}>
                {winningArticleList.length > 0 &&
					<span
						className={styles['content-article-list-container-winning-articles']}>Список рассказов, которые победили</span>}
                {winningArticleList.length > 0 &&
                    winningArticleList.slice().reverse().map((winningArticle) => (
                        <>
                            <ArticleLink
                                key={winningArticle.index}
                                title={winningArticle.title}
                                index={winningArticle.index}
                            />
                        </>
                    ))
                }
            </div>
        </div>
    );
};

export default WheelPageContent;
