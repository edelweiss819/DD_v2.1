import {LastArticlesList} from '../../users';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export interface IAddArticleToUserLastArticlesList {
    message: string;
    lastArticles: LastArticlesList;
}

export const addArticleToUserLastArticlesList = async (
    token: string,
    articleIndex: number
): Promise<IAddArticleToUserLastArticlesList> => {
    const response = await axiosInstance.post(
        API_ROUTES.POST_USER_LAST_ARTICLE,
        {articleIndex},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}
