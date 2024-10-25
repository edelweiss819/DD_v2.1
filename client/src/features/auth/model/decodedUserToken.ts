import {IUser} from '../../../entities/users';

export type DecodedUserToken = Pick<IUser, 'index' | 'role'> & {
    exp: number;
    iat: number;
};
