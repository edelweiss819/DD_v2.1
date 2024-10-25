import {useQuery} from '@tanstack/react-query';
import {
    fetchSingleArticleByIndex,
    IFetchSingleArticleByIndexResponse
} from '../api';

export const useFetchSingleArticleByIndex = (index: string | number | undefined) => {
    return useQuery<IFetchSingleArticleByIndexResponse, Error>({
                                                                   queryKey: [
                                                                       'fetchSingleArticleByIndex',
                                                                       index
                                                                   ],
                                                                   queryFn: () => {
                                                                       if (index === undefined) {
                                                                           throw new Error('Индекс обязателен!');
                                                                       }
                                                                       const indexAsString = String(index);
                                                                       return fetchSingleArticleByIndex(indexAsString);
                                                                   },
                                                                   retry: 0,
                                                                   enabled: !!index
                                                               });
};
