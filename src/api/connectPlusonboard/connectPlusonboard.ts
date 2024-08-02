import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { apiHandler, apiHandlerWithFormData } from '../common/api';

export const bookademo = async (payload: any) => {
    const url = 'itl-connect-plus-demo/create-shopify-order.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};
