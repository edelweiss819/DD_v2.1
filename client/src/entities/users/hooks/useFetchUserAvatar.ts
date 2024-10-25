import {useQuery} from '@tanstack/react-query';
import {
    fetchUserAvatar,
    IFetchUserAvatarRes
} from '../../articles';


export const useFetchUserAvatar = (index: number | undefined) => {
    const {
        data,
        isLoading,
        error
    } = useQuery<IFetchUserAvatarRes, Error>({
                                                 queryKey: [
                                                     'fetchUserAvatar',
                                                     index
                                                 ],
                                                 queryFn: async () => {
                                                     if (!index) {
                                                         throw new Error('Индекс обязателен.')
                                                     }
                                                     return await fetchUserAvatar(index);
                                                 }


                                             })

    return {
        data,
        isLoading,
        error
    }
}