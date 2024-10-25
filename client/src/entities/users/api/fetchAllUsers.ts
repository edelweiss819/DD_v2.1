import {IUser} from '../model';
import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';


export interface IFetchAllUsersReq {
    token: string;
    fields: string;
    limit: number;
    page: number;
    sortBy?: string;
    sortIndex?: number;
}

export interface IFetchAllUsersRes {
    message: string;
    users: Partial<IUser>[];
}

export const fetchAllUsers = async ({
                                        token,
                                        fields,
                                        limit,
                                        page,
                                        sortBy,
                                        sortIndex
                                    }: IFetchAllUsersReq): Promise<IFetchAllUsersRes> => {
    const response = await axiosInstance.get(API_ROUTES.GET_ALL_USERS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            'user-fields': fields,
            limit,
            page,
            ...(sortBy && {sortBy}),
            ...(sortIndex !== undefined && {sortIndex})
        }
    });

    return response.data;
};
