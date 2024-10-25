import {useQuery} from '@tanstack/react-query';
import {fetchUser, IFetchUserRes} from '../api';
import {IUser} from '../model';

type UserFieldKeys = keyof Partial<IUser> | 'fullUser';

export const useFetchOtherUser = (
    token: string,
    fields: UserFieldKeys[],
    userIndex?: number
) => {
    let fieldsString: string;

    if (fields.includes('fullUser')) {
        fieldsString = 'fullUser';
    } else {
        fieldsString = fields.join(',');
    }

    const {
        data,
        error,
        isLoading,
    } = useQuery<IFetchUserRes, Error>({
                                           queryKey: [
                                               'fetchOtherUser',
                                               token,
                                               fieldsString,
                                               userIndex
                                           ],
                                           queryFn: async () => {
                                               if (!token) {
                                                   throw new Error('Токен обязателен');
                                               }

                                               return await fetchUser({
                                                                          token,
                                                                          fields: fieldsString,
                                                                          userIndex,
                                                                      });
                                           },
                                       });

    return {
        data,
        error,
        isLoading,
    };
};
