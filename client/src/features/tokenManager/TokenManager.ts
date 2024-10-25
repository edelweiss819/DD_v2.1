import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {useRefreshToken} from '../auth/hooks/useRefreshToken.ts';

const TokenManager: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const {refetch: refreshToken} = useRefreshToken(token);

    useEffect(() => {
        if (token) {
            const intervalId = setInterval(() => {
                if (token) {
                    refreshToken();
                }
            }, 600000 / 2); // 600000  = 10 min

            return () => clearInterval(intervalId);
        }
    }, [
                  token,
                  refreshToken
              ]);

    return null;
};

export default TokenManager;
