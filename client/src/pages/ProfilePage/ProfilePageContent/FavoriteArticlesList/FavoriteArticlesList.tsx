import React from 'react';
import ArticleLink from '../../../../shared/ui/ArticleLink/ArticleLink.tsx';
import styles from './FavoriteArticlesList.module.scss'

interface FavoriteArticlesListProps {
    articles: Array<{ title: string; index: number }>;
}

const FavoriteArticlesList: React.FC<FavoriteArticlesListProps> = ({articles}) => {
    return (
        <>
            <div
                className={styles['block']}>{'Ваши любимые статьи'}</div>
            {articles.map((article) => (
                <ArticleLink title={article.title} index={article.index}
                             key={article.index}/>
            ))}
        </>
    );
};

export default FavoriteArticlesList;
