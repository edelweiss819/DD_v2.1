import React from 'react';
import styles from "./Header.module.scss"

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <header className={styles['main-theme']}>
            {children}
        </header>
    );
};

export default Header;
