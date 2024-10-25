import {axiosInstance} from '../../../config';
import {IArticle} from '../model';
import {API_ROUTES} from '../../../config';

export interface IFetchSingleArticleByIndexResponse {
    article: IArticle;
}

export const fetchSingleArticleByIndex = async (index: string): Promise<IFetchSingleArticleByIndexResponse> => {
    const response = await axiosInstance.get(API_ROUTES.GET_SINGLE_ARTICLE_BY_INDEX.replace(':index', index));
    return response.data;
};