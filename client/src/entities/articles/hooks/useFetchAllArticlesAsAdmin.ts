import {useQuery} from '@tanstack/react-query';
import {
    fetchAllArticlesAsAdmin,
    IFetchAllArticlesAsAdminReq,
    IFetchAllArticlesAsAdminRes
} from '../api';

export const useFetchAllArticlesAsAdmin = (
    {
        token,
        page,
        limit,
        sortBy,
        sortIndex
    }: IFetchAllArticlesAsAdminReq
) => {
    const {
        data,
        isLoading,
        error
    } = useQuery<IFetchAllArticlesAsAdminRes, Error>({
                                                         queryKey: [
                                                             'fetchAllArticlesAsAdmin',
                                                             sortBy,
                                                             sortIndex,
                                                             page,
                                                             limit,
                                                         ],
                                                         queryFn: async () => {
                                                             if (!token) {
                                                                 throw new Error('Токен обязателен.');
                                                             }
                                                             return fetchAllArticlesAsAdmin({
                                                                                                token,
                                                                                                page,
                                                                                                limit,
                                                                                                sortBy,
                                                                                                sortIndex
                                                                                            })
                                                         },
                                                         refetchOnWindowFocus: false,
                                                     })

    return {
        data,
        isLoading,
        error
    }
}