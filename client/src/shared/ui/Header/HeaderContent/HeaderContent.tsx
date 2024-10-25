import React from 'react';
import styles from './HeaderContent.module.scss';
import Button from '../../Button/Button.tsx';
import {
    ButtonType,
    ButtonIcon,
    ButtonColor
} from '../../Button/Button.enums.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store.ts';
import {handleGoogleAuthWindow} from '../../../utils';


const HeaderContent: React.FC = () => {
    const {isAuthorized} = useSelector((state: RootState) => state.user);


    return (
        <div className={styles.container}>
            <div className={styles['left-block']}>
                <h1 className={styles['description-xl']}>
                    Тысячи коротких рассказов для чтения онлайн
                </h1>
                <p className={styles['description-l']}>
                    Погрузитесь в мир увлекательных рассказов — каждую неделю
                    новые истории от талантливых авторов!
                </p>
                {!isAuthorized && (
                    <div className={styles['btns-container']}>
                        <Button
                            type={ButtonType.MEDIUM}
                            text={'Sign Up'}
                            color={ButtonColor.BLUE}
                            icon={ButtonIcon.SIGN_UP_ARROW}
                            iconWidth={'24'}
                        />
                        <Button
                            type={ButtonType.MEDIUM}
                            text={'Sign In With Google'}
                            textRespond={true}
                            color={ButtonColor.GREY}
                            icon={ButtonIcon.GOOGLE}
                            iconWidth={'24'}
                            onClick={() => handleGoogleAuthWindow()}
                        />
                        <Button
                            type={ButtonType.MEDIUM}
                            text={'Facebook'}
                            textRespond={true}
                            color={ButtonColor.DARK_BLUE}
                            icon={ButtonIcon.FACEBOOK}
                            iconWidth={'24'}
                        />
                    </div>
                )}
            </div>
            <div className={styles['right-block']}></div>
        </div>
    );
};

export default HeaderContent;
