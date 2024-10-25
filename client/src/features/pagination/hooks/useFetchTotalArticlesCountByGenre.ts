import {useQuery} from '@tanstack/react-query';
import {generateGenreByLink} from '../../../shared/utils';
import {fetchTotalArticlesCountByGenre} from '../api';

export const useFetchTotalArticlesCountByGenre = (genreLink: string) => {
    return useQuery<number, Error>({
                                       queryKey: [
                                           'fetchTotalArticlesCountByGenre',
                                           genreLink
                                       ],
                                       queryFn: async () => {
                                           const genre = generateGenreByLink(genreLink);
                                           if (!genre) {
                                               throw new Error('Жанр не найден!');
                                           }

                                           return await fetchTotalArticlesCountByGenre(genre);

                                       },
                                       refetchOnWindowFocus: false
                                   });
};
