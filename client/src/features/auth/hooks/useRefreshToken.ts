import {useQuery} from '@tanstack/react-query';
import {IRefreshTokenResponse, refreshToken} from '../api';
import {useEffect} from 'react';
import {setToken} from '../../../entities/users';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store.ts';

export const useRefreshToken = (token?: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery<IRefreshTokenResponse, Error>({
                                                   queryKey: [
                                                       'RefreshToken',
                                                       token
                                                   ],
                                                   queryFn: async () => {
                                                       if (!token) {
                                                           throw new Error('Токен обязателен.');
                                                       }
                                                       return refreshToken(token);
                                                   },
                                                   enabled: false
                                               });

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.token));
        }
    }, [
                  data,
                  dispatch
              ]);

    return {
        data,
        error,
        isLoading,
        refetch,
    };
};
