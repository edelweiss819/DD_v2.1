import {
    IRegistrationForm
} from '../components';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';
import axios from 'axios';


export type AuthResponse = Pick<IRegistrationForm, 'email' | 'password'>;

export interface AuthResult {
    token: string;
}

export const auth = async (authData: AuthResponse): Promise<AuthResult> => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH, authData);

        const {
            token,
        } = response.data;
        return {
            token,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return Promise.reject({
                                          status: error.response.status,
                                          message: error.response.data.message || 'Неизвестная ошибка',
                                      });
            } else {
                return Promise.reject({
                                          status: 500,
                                          message: 'Ошибка сети или сервер не доступен',
                                      });
            }
        } else {
            return Promise.reject({
                                      status: 500,
                                      message: 'Произошла ошибка при добавлении пользователя.',
                                  });
        }
    }
};
