import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export const fetchTotalArticlesCountByGenre = async (genre: string): Promise<number> => {
    try {
        const res = await axiosInstance.get(API_ROUTES.GET_ARTICLES_TOTAL_COUNT_BY_GENRE.replace(':genre', genre));
        return res.data;
    } catch (error) {
        console.error('Ошибка получения метаданных:', error);
        throw error;
    }
}