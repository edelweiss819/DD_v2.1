import {useQuery} from '@tanstack/react-query';
import {fetchArticlesList} from '../api';
import {IArticle} from '../model';

export const useFetchArticlesList = (page: number, limit?: number) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               'fetchArticlesList',
                                               page,
                                               limit
                                           ],
                                           queryFn: () => fetchArticlesList({
                                                                                page,
                                                                                limit
                                                                            }),
                                           refetchOnWindowFocus: false
                                       });
};
