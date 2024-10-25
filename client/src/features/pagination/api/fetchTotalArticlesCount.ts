import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export const fetchTotalArticlesCount = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ARTICLES_TOTAL_COUNT);
        return response.data;
    } catch (error) {
        console.error('Ошибка получения метаданных:', error);
        throw error;
    }
};
