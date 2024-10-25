import React, {useEffect} from 'react';
import AppRoutes from './routes/routes.tsx';
import {BrowserRouter} from 'react-router-dom';
import styles from './App.module.scss'
import '../src/styles/styles.scss'
import {useDispatch} from 'react-redux';
import {AppDispatch} from './store/store.ts';
import {setAuthorized} from './entities/users';
import TokenManager from './features/tokenManager/TokenManager.ts';
import {GoogleOAuthProvider} from '@react-oauth/google';


const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const isAuthorized = JSON.parse(localStorage.getItem('isAuthorized') || 'false');
        dispatch(setAuthorized(isAuthorized));

    }, [dispatch]);


    return (
        <BrowserRouter>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                <TokenManager/>
                <div className={styles['app']}>
                    <AppRoutes/>
                </div>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
};

export default App;
