import React from 'react';
import styles from './PageLoader.module.scss';

const PageLoader: React.FC = () => {
    return (
        <div>
            <div className={styles['page-loader-background']}></div>
            <div className={styles['loader']}></div>
        </div>
    );
};

export default PageLoader;
