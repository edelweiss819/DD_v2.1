import {IArticle} from '../model';
import {API_ROUTES, axiosInstance} from '../../../config';

export interface IFetchAllArticlesAsAdminReq {
    token: string;
    page: number;
    limit: number;
    sortBy: string,
    sortIndex: number,

}

export interface IFetchAllArticlesAsAdminRes {
    message: string;
    articles: Partial<IArticle[]>;
}

export const fetchAllArticlesAsAdmin = async ({
                                                  token,
                                                  page,
                                                  limit,
                                                  sortBy,
                                                  sortIndex
                                              }: IFetchAllArticlesAsAdminReq): Promise<IFetchAllArticlesAsAdminRes> => {
    const res = await axiosInstance.get<IFetchAllArticlesAsAdminRes>(API_ROUTES.GET_ALL_ARTICLES_AS_ADMIN, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        params: {
            page,
            limit,
            sortBy,
            sortIndex,
        }
    })
    return res.data;

}