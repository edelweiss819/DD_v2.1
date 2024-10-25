import {API_ROUTES, axiosInstance} from '../../../config';
import {IUser} from '../model';


export interface IPatchUserDataReq {
    token: string;
    index: string;
    updatedData: Partial<IUser>;
}

export interface IPatchUserDataRes {
    message: string;
    user: Partial<IUser>
}

export const patchUserData = async ({
                                        token,
                                        index,
                                        updatedData
                                    }: IPatchUserDataReq): Promise<IPatchUserDataRes> => {
    const res = await axiosInstance.patch<IPatchUserDataRes>(API_ROUTES.PATCH_USER_DATA.replace(':index', index),
                                                             {
                                                                 updatedData
                                                             }, {
                                                                 headers: {
                                                                     authorization: `Bearer ${token}`,
                                                                 }
                                                             });
    return res.data;
}