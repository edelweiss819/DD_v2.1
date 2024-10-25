import {useQuery} from '@tanstack/react-query';
import {
    fetchUsersCount,
    IFetchUsersCountReq,
    IFetchUsersCountRes
} from '../api';

export const useFetchUsersCount = ({token}: IFetchUsersCountReq) => {
    const {
        data,
        isLoading,
        error
    } = useQuery<IFetchUsersCountRes, Error>({
                                                 queryKey: [
                                                     'fetchUsersCount',
                                                     token
                                                 ],
                                                 queryFn: async () => {
                                                     if (!token) {
                                                         throw new Error('Токен обязателен.');
                                                     }
                                                     return await fetchUsersCount({token});
                                                 },

                                             });

    return {
        data,
        isLoading,
        error
    }
};
