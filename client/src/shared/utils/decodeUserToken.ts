import {jwtDecode} from 'jwt-decode';
import {DecodedUserToken} from '../../features/auth';

export const decodeUserToken = (token: string): DecodedUserToken => {
    return jwtDecode<DecodedUserToken>(token);
};
