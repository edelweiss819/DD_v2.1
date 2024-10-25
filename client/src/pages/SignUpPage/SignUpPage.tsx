import React, {useEffect} from 'react';
import LoginPageLayout from '../../layouts/LoginPageLayout/LoginPageLayout.tsx';
import RegistrationForm
    from '../../features/auth/components/RegistationForm/RegistrationForm.tsx';

const SignUpPage: React.FC = () => {
    useEffect(() => {
        document.title = 'DD || Зарегистрироваться';
    }, []);
    return (
        <LoginPageLayout formTitle={'Или создайте аккаунт:'}>
            {<RegistrationForm/>}
        </LoginPageLayout>
    );
};

export default SignUpPage;
