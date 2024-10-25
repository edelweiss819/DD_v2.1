import {useMutation} from '@tanstack/react-query';
import {IToggleArticleFavStatusResponse, toggleFavArticleStatus} from '../api';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store.ts';
import {setFavoriteArticles} from '../../users';

export const useToggleFavArticleStatus = () => {
    const dispatch = useDispatch<AppDispatch>();
    return useMutation<IToggleArticleFavStatusResponse, Error, {
        index: number;
        token: string
    }>({
           mutationKey: ['toggleFavArticleStatus'],
           mutationFn: ({
                            index,
                            token
                        }) => toggleFavArticleStatus(index, token),
           onSuccess: (data) => {
               dispatch(setFavoriteArticles(data.favoriteArticles));

           },
           onError: (error) => {
               console.error('Ошибка при изменении статуса избранного:', error);
           }
       });
};
