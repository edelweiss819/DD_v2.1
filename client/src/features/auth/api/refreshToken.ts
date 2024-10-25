import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';


export interface IRefreshTokenResponse {
    token: string;
}

export const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    try {
        const res = await axiosInstance.post<IRefreshTokenResponse>(
            API_ROUTES.REFRESH_TOKEN,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        throw error;
    }

};
