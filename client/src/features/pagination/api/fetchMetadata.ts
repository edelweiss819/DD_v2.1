import {axiosInstance} from '../../../config';
import {API_ROUTES} from '../../../config';

export const fetchMetadata = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_METADATA);
        return response.data;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        throw error;
    }
};
