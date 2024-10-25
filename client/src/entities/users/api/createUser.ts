import axios from 'axios';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';
import {IUser} from '../model';

export type CreateUserResponse = Pick<IUser, 'email' | 'password'>;

export const createUser = async (userData: CreateUserResponse) => {
    try {
        await axiosInstance.post(API_ROUTES.POST_USER, userData);
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
}
