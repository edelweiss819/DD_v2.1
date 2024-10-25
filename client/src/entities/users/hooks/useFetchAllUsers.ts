import {useQuery} from '@tanstack/react-query';
import {IFetchAllUsersRes, IFetchAllUsersReq, fetchAllUsers} from '../api';

export const useFetchAllUsers = ({
                                     token,
                                     fields,
                                     limit,
                                     page,
                                     sortBy,
                                     sortIndex,
                                 }: IFetchAllUsersReq) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery<IFetchAllUsersRes, Error>({
                                               queryKey: [
                                                   'fetchAllUsers',
                                                   token,
                                                   page,
                                                   fields,
                                                   sortBy,
                                                   sortIndex
                                               ],
                                               queryFn: async () => {
                                                   if (!token) {
                                                       throw new Error('Токен обязателен');
                                                   }
                                                   return await fetchAllUsers({
                                                                                  token,
                                                                                  fields,
                                                                                  limit,
                                                                                  page,
                                                                                  sortBy,
                                                                                  sortIndex,
                                                                              });
                                               },
                                           });

    return {
        data,
        isLoading,
        error,
    };
};
