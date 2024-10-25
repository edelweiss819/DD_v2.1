import {API_ROUTES, axiosInstance} from '../../../config';

export interface IFetchUsersCountReq {
    token: string;
}

export interface IFetchUsersCountRes {
    message: string;
    usersCount: number;
}

export const fetchUsersCount = async ({token}: IFetchUsersCountReq): Promise<IFetchUsersCountRes> => {
    const res = await axiosInstance.get<IFetchUsersCountRes>(API_ROUTES.GET_USERS_COUNT, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}