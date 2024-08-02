import config from '../../util/config';
import { authHeader } from '../../util/AuthHeader';
import { checkTokenValidation } from '../common/api';
export const getMenuResponse = async () => {
    const apiPath = 'common_module_v3/get-menu-list-temp-v3.php';
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

export const updateMenuType = async (payload: any) => {
    const apiPath = 'all-submit-files/menu-change-submit.json';
    const params_temp = new URLSearchParams();
    params_temp.append('is_menu_collapse', '1');
    params_temp.append('is_menu_domestic', payload);

    const result = await fetch(config.baseUrlPanel + apiPath, {
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
export const updateWalletAmount = async () => {
    const apiPath = 'all-submit-files/get-user-credit-amount-v3.json';
    const result = await fetch(config.baseUrlPanel + apiPath, {
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
