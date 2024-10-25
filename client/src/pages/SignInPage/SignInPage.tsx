import React, {useEffect} from 'react';
import LoginPageLayout from '../../layouts/LoginPageLayout/LoginPageLayout.tsx';
import LoginForm from '../../features/auth/components/LoginForm/LoginForm.tsx';

const SignInPage: React.FC = () => {
    useEffect(() => {
        document.title = 'DD || Войти';
    }, []);
    return (
        <LoginPageLayout formTitle={'Или войдите:'}>
            <LoginForm/>
        </LoginPageLayout>
    );
};

export default SignInPage;
