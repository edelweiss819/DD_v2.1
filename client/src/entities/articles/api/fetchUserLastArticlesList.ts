import {LastArticlesList} from '../../users';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export interface IFetchUserLastArticlesListResponse {
    message: string;
    lastArticles: LastArticlesList
}

export const fetchUserLastArticlesList = async (token: string): Promise<IFetchUserLastArticlesListResponse> => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_USER_LAST_ARTICLES_LIST, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении списка избранных статей:', error);
        throw error;
    }
}