import React from 'react';
import styles from './Logo.module.scss';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

export interface LogoProps {
    firstPartColor: string;
    secondPartColor: string;
    to?: string;
}

const Logo: React.FC<LogoProps> = ({
                                       firstPartColor,
                                       secondPartColor,
                                       to,
                                   }) => {
    const logoFirstPartClass = classNames({
                                              [styles['logo-first-part-light']]: firstPartColor === 'light',
                                              [styles['logo-first-part-dark']]: firstPartColor === 'dark',
                                          });
    const logoSecondPartClass = classNames({
                                               [styles['logo-second-part-blue']]: secondPartColor === 'blue',
                                           });

    return (
        <Link to={`${to}`} className={styles['logo']}>
            <span className={logoFirstPartClass}>Desire</span>
            <span className={logoSecondPartClass}>Diaries</span>
        </Link>
    );
};

export default Logo;
