import {useQuery} from '@tanstack/react-query';
import {fetchTotalArticlesCount} from '../api';


export const useFetchTotalArticlesCount = () => {
    return useQuery<number, Error>({
                                       queryKey: ['fetchTotalArticlesCount'],
                                       queryFn: fetchTotalArticlesCount,
                                       refetchOnWindowFocus: false
                                   });
};
