import {useQuery} from '@tanstack/react-query';
import {
    fetchTotalArticlesCountByGenreAndWords,
    IFetchTotalArticlesCountByGenreAndWords
} from '../api';

export const useFetchTotalArticlesCountByGenreAndWords = (
    params: IFetchTotalArticlesCountByGenreAndWords,
) => {
    return useQuery<number, Error>({
                                       queryKey: [
                                           'fetchTotalArticlesByGenreAndWords',
                                           params
                                       ],
                                       queryFn: async () => await fetchTotalArticlesCountByGenreAndWords(params),
                                       refetchOnWindowFocus: false
                                   })
}