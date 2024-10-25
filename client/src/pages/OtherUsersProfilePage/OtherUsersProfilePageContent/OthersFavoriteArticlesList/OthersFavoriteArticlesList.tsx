import React from 'react';
import ArticleLink from '../../../../shared/ui/ArticleLink/ArticleLink.tsx';
import styles from './OthersFavoriteArticlesList.module.scss'

interface FavoriteArticlesListProps {
    articles: Array<{ title: string; index: number }>;
}

const OthersFavoriteArticlesList: React.FC<FavoriteArticlesListProps> = ({articles}) => {
    return (
        <>
            <div
                className={styles['block']}>{'Любимые статьи пользователя'}</div>
            {articles.map((article) => (
                <ArticleLink title={article.title} index={article.index}
                             key={article.index}/>
            ))}
        </>
    );
};

export default OthersFavoriteArticlesList;
