import {useQuery} from '@tanstack/react-query';
import {IArticle} from '../../../entities/articles';
import {
    fetchArticlesListByGenreAndWords,
    IFetchArticlesListByGenreAndWordsParams
} from '../api';

export interface IFetchArticlesResponse {
    articles: IArticle[];
    cursor: number;
}


export const useFetchArticlesListByGenreAndWords = (
    params: IFetchArticlesListByGenreAndWordsParams
) => {
    return useQuery<IFetchArticlesResponse, Error>({
                                                       queryKey: [
                                                           'fetchArticlesListByGenreAndWords',
                                                           params
                                                       ],
                                                       queryFn: async () => fetchArticlesListByGenreAndWords(params),
                                                       refetchOnWindowFocus: false,
                                                       retry: 0,
                                                   })
}