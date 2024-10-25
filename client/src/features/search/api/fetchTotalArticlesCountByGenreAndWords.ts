import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';


export interface IFetchTotalArticlesCountByGenreAndWords {
    genres?: string;
    s?: string;

}


export const fetchTotalArticlesCountByGenreAndWords = async ({
                                                                 genres,
                                                                 s
                                                             }: IFetchTotalArticlesCountByGenreAndWords): Promise<number> => {
    const res = await axiosInstance.get(API_ROUTES.GET_TOTAL_ARTICLES_COUNT_BY_GENRE_AND_WORDS, {
        params: {
            genres,
            s,
        }
    })
    // console.log('Response from API:', res.data);
    return res.data
}