import {useQuery} from '@tanstack/react-query';
import {fetchArticlesListByGenre} from '../api';
import {IArticle} from '../model';
import {generateGenreByLink} from '../../../shared/utils';

export const useFetchArticlesListByGenre = (page: number, genreLink: string,
                                            limit?: number) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               'fetchArticlesListByGenre',
                                               genreLink,
                                               page,
                                               limit
                                           ],
                                           queryFn: async () => {

                                               const genre = generateGenreByLink(genreLink);

                                               if (!genre) {
                                                   throw new Error('Жанр не найден!');
                                               }

                                               return await fetchArticlesListByGenre({
                                                                                         genre,
                                                                                         page,
                                                                                         limit,
                                                                                     });


                                           },
                                           retry: 0,
                                       });
}
