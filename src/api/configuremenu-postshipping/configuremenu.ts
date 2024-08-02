import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';
// import { checklogin } from '@/views/checkLogin';

// dropdown api by default
export const saveConfigdropdown = async (payload: any) => {
    console.log(payload);
    const apiPath = 'post-ship-v3/get-user-menu-list.json';
    const params_temp = new URLSearchParams();

    params_temp.append('mode', payload.mode);
    params_temp.append('vendor_id', payload.vendor_id);
    params_temp.append('store_id', payload.storeId);
    // api request start
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),

        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};

// For save button
export const saveConfigData = async (payload: any) => {
    const apiPath = 'post-ship-v3/save-user-menu-list.json';
    const params_temp = new URLSearchParams();
    params_temp.append('store_id', payload.storeId);

    // api request start
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};

//  On click button api
export const getPostShipStoreList = async () => {
    const apiPath = 'post-ship-v3/get-user-store-list.json';

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};
