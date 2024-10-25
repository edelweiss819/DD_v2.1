import {API_ROUTES} from '../../config';


export const handleGoogleAuthWindow = () => {
    window.location.href = API_ROUTES.GET_GOOGLE_AUTH;
};