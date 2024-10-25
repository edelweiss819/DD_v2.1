import React from 'react';
import {Link} from 'react-router-dom';
import styles from './AuthorLink.module.scss';

export interface IAuthorLinkProps {
    index: number;
    name: string;
}

const AuthorLink: React.FC<IAuthorLinkProps> = ({
                                                    index,
                                                    name
                                                }) => {
    return (

        <Link className={styles['author-link']} to={`/user/${index}`}
              key={index}>
            <span style={{display: 'inline-flex'}}>{name}</span>
        </Link>
    );
};

export default AuthorLink;
