import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './ArticleLink.module.scss';
import {Link} from 'react-router-dom';

export interface ArticleLinkProps {
    title: string;
    index: number;
}

const ArticleLink: React.FC<ArticleLinkProps> = ({
                                                     title,
                                                     index
                                                 }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/articles/${index}`);
    };

    return (
        <div className={styles['link-container']} onClick={handleClick}>
            <Link className={styles['link-container-text']}
                  to={`/articles/${index}`} key={index}>
                {title}
            </Link>
        </div>
    );
};

export default ArticleLink;
