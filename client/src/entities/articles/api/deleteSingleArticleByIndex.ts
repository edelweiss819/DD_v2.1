import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export interface IDeleteSingleArticleByIndexReq {
    index: string;
    token: string;
}

export interface IDeleteSingleArticleByIndexRes {
    message: string;
}

export const deleteSingleArticleByIndex = async ({
                                                     index,
                                                     token,
                                                 }: IDeleteSingleArticleByIndexReq): Promise<IDeleteSingleArticleByIndexRes> => {
    const res = await axiosInstance.delete<IDeleteSingleArticleByIndexRes>(
        API_ROUTES.DELETE_SINGLE_ARTICLE_BY_INDEX.replace(':index', index),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};
