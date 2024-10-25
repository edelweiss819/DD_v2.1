import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export interface IFetchRandomArticlesListResponse {
    message: string;
    randomArticlesList: { index: number; title: string }[];
}


export const fetchRandomArticlesList = async (): Promise<IFetchRandomArticlesListResponse> => {
    const res = await axiosInstance.get<IFetchRandomArticlesListResponse>(API_ROUTES.GET_RANDOM_ARTICLES_LIST);
    return res.data;
}
