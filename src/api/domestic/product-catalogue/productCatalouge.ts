import config from '../../../util/config';
import { authHeader } from '../../../util/AuthHeader';
import { apiHandler } from '../../../api/common/api';

export const fetchCategoryApi = async () => {
    const url = 'product-catalogue-v3/get-product-category-master.json';

    const result = await apiHandler(url);

    return result;
};
export const fetchProductSubmitApi = async (payload: any) => {
    const apiPath = 'product-catalogue-v3/product-catalogue-submit-v3.json';
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const getProductData = async (payload: any) => {
    const apiPath = 'product-catalogue-v3/get-channel-inventory-product.json';
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const imageUpload = async (payload: any) => {
    const apiPath = 'product-catalogue-v3/upload-product-image.json';
    const result = await apiHandler(apiPath, payload, true);
    return result;
};
