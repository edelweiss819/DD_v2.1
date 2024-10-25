import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';
import {IArticle} from '../model';
import {IFetchArticlesListReq} from './fetchArticlesList.ts';

export interface IFetchArticlesListByGenreParams extends IFetchArticlesListReq {
    genre: string;
}

export const fetchArticlesListByGenre = async ({
                                                   page,
                                                   limit,
                                                   genre
                                               }: IFetchArticlesListByGenreParams): Promise<IArticle[]> => {
    const res = await axiosInstance.get(API_ROUTES.GET_ARTICLES_LIST_BY_GENRE.replace(':genre', genre), {
        params: {
            page,
            limit: limit ?? 10
        }
    })
    return res.data;

}