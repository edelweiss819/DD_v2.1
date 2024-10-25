import React from 'react';
import styles from './Footer.module.scss';
import Logo from '../Logo/Logo.tsx';

const Footer: React.FC = () => (
    <footer className={styles['footer']}>
        <div className={styles['footer-content']}>
            <div className={styles['footer-content-logo']}>
                <Logo firstPartColor={'dark'} secondPartColor={'blue'}
                      to={'/'}/>
            </div>
            <p className={styles['footer-content-text']}>
                2024
            </p>
        </div>
    </footer>
);

export default Footer;


