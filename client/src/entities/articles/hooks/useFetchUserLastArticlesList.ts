import {useQuery} from '@tanstack/react-query';
import {
    fetchUserLastArticlesList,
    IFetchUserLastArticlesListResponse
} from '../api';
import {useEffect} from 'react';
import {
    setUserLastArticlesList
} from '../../users';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store.ts';

export const useFetchUserLastArticlesList = (token: string | undefined) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        data,
        error,
        isLoading,
    } = useQuery<IFetchUserLastArticlesListResponse, Error>(
        {
            queryKey: [
                'fetchUserLastArticlesList',
                token
            ],
            queryFn: async () => {
                if (!token) {
                    throw new Error('Токен обязателен.');
                }
                return await fetchUserLastArticlesList(token);
            },
            refetchInterval: 5000,
        }
    );

    useEffect(() => {
        if (data) {
            // console.log(data.message);
            dispatch(setUserLastArticlesList(data.lastArticles));
        }
    }, [
                  data,
                  dispatch
              ]);

    return {
        data,
        error,
        isLoading,
    }
}
