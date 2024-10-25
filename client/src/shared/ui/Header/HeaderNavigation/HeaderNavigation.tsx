import React from 'react';
import styles from './HeaderNavigation.module.scss';
import Button from '../../Button/Button.tsx';
import {
    ButtonColor,
    ButtonType,
} from '../../Button/Button.enums.ts';
import Logo from '../../Logo/Logo.tsx';
import {
    HEADER_NAVIGATION_AUTHORIZED_PAGES,
    HEADER_NAVIGATION_PAGES
} from '../../../../constants';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store.ts';
import {removeUser} from '../../../../entities/users';

const HeaderNavigation: React.FC = () => {

    const {isAuthorized} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleExitButton = () => {
        dispatch(removeUser());
        navigate('/');

    }


    return (
        <nav className={styles.nav}>
            <div className={styles['nav-container']}>
                <Logo firstPartColor={'light'} secondPartColor={'blue'}
                      to={'/'}/>
                <div className={styles['nav-link-container']}>
                    {Object.entries(HEADER_NAVIGATION_PAGES).map(([pageName, route]) => {
                        if (HEADER_NAVIGATION_AUTHORIZED_PAGES.includes(pageName) && !isAuthorized) {
                            return null;
                        }
                        return (
                            <div key={pageName}>
                                <Link to={route}
                                      className={styles['nav-link']}>{pageName}
                                </Link>
                            </div>
                        )
                    })}
                    {isAuthorized ?
                        <Button text={'Выйти'} color={ButtonColor.RED}
                                type={ButtonType.NAV_LOGIN}
                                onClick={handleExitButton}/> :
                        <Button text={'Войти'} to={'/sign_in'}
                                color={ButtonColor.BLUE}
                                type={ButtonType.NAV_LOGIN}/>}
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavigation;
