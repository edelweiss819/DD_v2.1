import {IUser} from '../model';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export interface IFetchUserReq {
    token: string;
    fields: string;
    userIndex?: number;
}

export interface IFetchUserRes {
    message: string;
    user: IUser;
}

export const fetchUser = async ({
                                    token,
                                    fields,
                                    userIndex
                                }: IFetchUserReq): Promise<IFetchUserRes> => {
    const response = await axiosInstance.get(API_ROUTES.GET_USER, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            'user-fields': fields,
            ...(userIndex !== undefined && {'user-index': userIndex.toString()})
        }
    });

    return response.data;
};
