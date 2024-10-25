import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames';

import SignUpArrow from '../../../assets/ButtonIcons/SignUpArrow.svg?react';
import Google from '../../../assets/ButtonIcons/Google.svg?react';
import Facebook from '../../../assets/ButtonIcons/Facebook.svg?react';
import {ButtonColor, ButtonIcon, ButtonType} from './Button.enums.ts';


export type ButtonTextRespond = boolean;

interface ButtonProps {
    text: string;
    textRespond?: ButtonTextRespond;
    to?: string;
    color?: ButtonColor;
    icon?: ButtonIcon;
    iconWidth?: number | string;
    type: ButtonType;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           textRespond,
                                           to,
                                           color,
                                           icon,
                                           iconWidth,
                                           type,
                                           onClick,
                                       }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const colorClass = classNames({
                                      [styles['btn-blue']]: color === ButtonColor.BLUE,
                                      [styles['btn-red']]: color === ButtonColor.RED,
                                      [styles['btn-grey']]: color === ButtonColor.GREY,
                                      [styles['btn-white']]: color === ButtonColor.WHITE,
                                      [styles['btn-dark-blue']]: color === ButtonColor.DARK_BLUE,
                                  });

    const textClass = textRespond ? styles['btn-text-respond'] : '';

    const buttonClass = classNames(styles['btn'], colorClass, {
        [styles['btn-m']]: type === ButtonType.MEDIUM,
        [styles['btn-m-flex']]: type === ButtonType.MEDIUM_FLEX,
        [styles['btn-l']]: type === ButtonType.LARGE,
        [styles['btn-l-flex']]: type === ButtonType.LARGE_FLEX,
        [styles['btn-rs']]: type === ButtonType.ROUNDED_SMALL,
        [styles['btn-nav-login']]: type === ButtonType.NAV_LOGIN,
        [styles['btn-search']]: type === ButtonType.SEARCH,
    });

    const iconSrc = icon === ButtonIcon.SIGN_UP_ARROW ? SignUpArrow
        : icon === ButtonIcon.GOOGLE ? Google
            : icon === ButtonIcon.FACEBOOK ? Facebook
                : undefined;

    const iconClass = classNames(styles['btn-icon'], {
        [styles['btn-icon-no-margin']]: textRespond && isMobile,
    });

    return (
        <Link
            className={buttonClass}
            title={text}
            to={to ? to : ''}
            onClick={onClick}
        >
            <span className={textClass}>{text}</span>
            {iconSrc && (
                typeof iconSrc === 'string' ? (
                    <img
                        className={iconClass}
                        src={iconSrc}
                        width={iconWidth}
                        alt={icon}
                    />
                ) : (
                    React.createElement(iconSrc, {
                        width: iconWidth,
                    })
                )
            )}
        </Link>
    );
};

export default Button;
