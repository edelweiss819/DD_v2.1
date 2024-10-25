import {axiosInstance} from '../../../config';
import {IArticle} from '../model';
import {API_ROUTES} from '../../../config';

export interface IFetchArticlesListReq {
    page: number;
    limit?: number;
}

export const fetchArticlesList = async ({
                                            page,
                                            limit
                                        }: IFetchArticlesListReq): Promise<IArticle[]> => {
    const response = await axiosInstance.get(API_ROUTES.GET_ARTICLES_LIST, {
        params: {
            page,
            limit: limit ?? 10,
        },
    });
    return response.data;
};
