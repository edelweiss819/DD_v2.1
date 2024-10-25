import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './LoginForm.module.scss'
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {
    ButtonColor,
    ButtonType
} from '../../../../shared/ui/Button/Button.enums.ts';
import {Link} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import {IRegistrationForm} from '../RegistationForm';
import {useAuth} from '../../hooks';
import {useNavigate} from 'react-router';


type LoginForm = Pick<IRegistrationForm, 'email' | 'password'>

const LoginForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm<LoginForm>();

    const navigate = useNavigate();

    const mutation = useAuth(
        navigate,
        undefined,
        (error) => {
            if (error.status === 400) {
                setError('email', {message: error.message});
            } else if (error.status === 401) {
                setError('password', {message: error.message});
            } else {
                console.error('Ошибка при регистрации пользователя:', error);
            }
        }
    );


    const onSubmit = (authData: LoginForm) => {
        // console.log('Данные для отправки:', authData);
        mutation.mutate(authData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['grid']}>
            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    formType={'registration-form'}
                    name={'email'}
                    type={'email'}
                    placeholder={'Введите ваш email...'}
                    required
                    validation={{
                        required: 'Email обязателен',
                        pattern: {
                            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                            message: 'Введите корректный email',
                        }
                    }}
                />
                <ErrorMessage field={'email'} errors={errors}/>
            </div>

            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    name={'password'}
                    formType={'registration-form'}
                    type={'password'}
                    placeholder={'Пароль...'}
                    validation={{
                        required: 'Пароль обязателен',
                        pattern: {
                            value: /^[a-zA-Z0-9_]{10,}$/,
                            message: 'Введите корректный пароль'
                        }
                    }}
                />
            </div>
            <ErrorMessage field={'password'} errors={errors}/>

            <div
                className={styles['grid-cell-full']}>
                <Button text={'Войти'} type={ButtonType.LARGE_FLEX}
                        color={ButtonColor.BLUE}
                        onClick={handleSubmit(onSubmit)}/>
            </div>
            <div className={styles['grid-cell-full']}>
                <span
                    className={styles['text']}>Нужно создать аккаунт? - &nbsp;</span>
                <Link className={styles['text-link']} to={'/sign_up'}>
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
