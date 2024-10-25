import {useQuery} from '@tanstack/react-query';
import {fetchUser, IFetchUserRes} from '../api';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store.ts';
import {setUser} from '../slice';
import {IUser} from '../model';

type UserFieldKeys = keyof Partial<IUser> | 'fullUser';

export const useFetchUser = (
    token: string,
    fields: UserFieldKeys[],
    userIndex?: number
) => {
    const dispatch = useDispatch<AppDispatch>();

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
                                               'fetchUser',
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

    useEffect(() => {
        if (data) {
            // console.log(data.message);
            dispatch(setUser(data.user));
        }
    }, [
                  data,
                  dispatch
              ]);

    return {
        data,
        error,
        isLoading,
    };
};
