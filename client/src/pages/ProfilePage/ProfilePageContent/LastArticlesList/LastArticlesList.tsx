import React from 'react';
import styles from './LastArticlesList.module.scss'
import ArticleLink from '../../../../shared/ui/ArticleLink/ArticleLink.tsx';

interface LastArticlesListProps {
    articlesGroupedByDate: {
        [date: string]: Array<{ title: string; index: number }>
    };
}

const LastArticlesList: React.FC<LastArticlesListProps> = ({articlesGroupedByDate}) => {
    return (
        <>
            {Object.keys(articlesGroupedByDate).length > 0 ? (
                Object.keys(articlesGroupedByDate).map((dateKey) => (
                    <div key={dateKey}>
                        <div
                            className={styles['block']}>{dateKey}</div>
                        {articlesGroupedByDate[dateKey].map((article) => (
                            <ArticleLink title={article.title}
                                         index={article.index}
                                         key={article.index}/>
                        ))}
                    </div>
                ))
            ) : (
                <p>Вы еще не читали ни одной статьи.</p>
            )}
        </>
    );
};

export default LastArticlesList;
