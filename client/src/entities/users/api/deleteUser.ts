import {API_ROUTES, axiosInstance} from '../../../config';

export interface IDeleteUserReq {
    token: string;
    index: string;
}

export interface IDeleteUserRes {
    message: string;
    index: number;
}

export const deleteUser = async ({
                                     token,
                                     index
                                 }: IDeleteUserReq): Promise<IDeleteUserRes> => {
    const res = await axiosInstance.delete<IDeleteUserRes>(API_ROUTES.DELETE_USER_BY_INDEX.replace(':index', index),
                                                           {
                                                               headers: {
                                                                   Authorization: `Bearer ${token}`,
                                                               }
                                                           })
    return res.data;
}