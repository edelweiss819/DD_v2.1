import React from 'react';
import styles from './LoginPageLayout.module.scss'
import Logo from '../../shared/ui/Logo/Logo.tsx';
import Button from '../../shared/ui/Button/Button.tsx';
import {
    ButtonColor,
    ButtonType,
    ButtonIcon
} from '../../shared/ui/Button/Button.enums.ts';
import {handleGoogleAuthWindow} from '../../shared/utils';

export interface LoginPageLayoutProps {
    children?: React.ReactNode;
    formTitle?: string;
}

const LoginPageLayout: React.FC<LoginPageLayoutProps> = ({
                                                             children,
                                                             formTitle
                                                         }) => {


    return (
        <div className={styles['main-wrapper']}>
            <div className={styles['container']}>
                <div className={styles['container-content-wrapper']}>
                    <Logo firstPartColor={'dark'} secondPartColor={'blue'}
                          to={'/'}/>
                    <div
                        className={styles['container-content-wrapper-h1']}>
                        Добро пожаловать на Desire Diaries 👋
                    </div>
                    <div
                        className={styles['container-content-wrapper-social-block']}>
                        <p className={styles['container-content-wrapper-social-block-p']}>Войти
                            с помощью вашей социальной сети:</p>
                        <div
                            className={styles['container-content-wrapper-social-block-buttons-block']}>
                            <Button text={'Google'}
                                    color={ButtonColor.WHITE}
                                    type={ButtonType.MEDIUM_FLEX}
                                    icon={ButtonIcon.GOOGLE}
                                    iconWidth={'24'}
                                    onClick={() => handleGoogleAuthWindow()}/>
                            <Button text={'Facebook'}
                                    color={ButtonColor.DARK_BLUE}
                                    type={ButtonType.MEDIUM_FLEX}
                                    icon={ButtonIcon.FACEBOOK}
                                    iconWidth={'24'}/>
                        </div>
                    </div>
                    <p className={styles['container-content-wrapper-form-title']}>
                        {formTitle}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LoginPageLayout;
