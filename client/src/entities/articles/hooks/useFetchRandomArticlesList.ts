import {useQuery} from '@tanstack/react-query';
import {
    fetchRandomArticlesList,
    IFetchRandomArticlesListResponse
} from '../api';

export const useFetchRandomArticlesList = () => {
    return useQuery<IFetchRandomArticlesListResponse, Error>({
                                                                 queryKey: ['fetchRandomArticlesList'],
                                                                 queryFn: fetchRandomArticlesList,
                                                                 refetchOnWindowFocus: false,
                                                                 refetchOnMount: false,
                                                             });
}
