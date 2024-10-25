import {useQuery} from '@tanstack/react-query';
import {
    addArticleToUserLastArticlesList,
    IAddArticleToUserLastArticlesList
} from '../api';

export const useAddArticleToUserLastArticlesList = (token: string,
                                                    articleIndex: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery<IAddArticleToUserLastArticlesList, Error>({
                                                               queryKey: [
                                                                   'addArticleToUserLastArticlesList',
                                                                   token,
                                                                   articleIndex
                                                               ],
                                                               queryFn: async () => {
                                                                   if (!token) {
                                                                       throw new Error('Токен обязателен.');
                                                                   }
                                                                   return await addArticleToUserLastArticlesList(token, articleIndex);

                                                               }
                                                           })


    return {
        data,
        error,
        isLoading, // Добавлено
    }
}