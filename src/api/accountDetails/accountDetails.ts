import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { apiHandler, checkTokenValidation } from '../common/api';

export const getAccountDetails = async (payload: any) => {
    const apiPath = 'account-setting-v3/get-user-account-details.json';
    const result = await apiHandler(apiPath, payload);
    return result;
    // const params_temp = new URLSearchParams(payload);

    // const result = await fetch(config.baseUrlApi + apiPath, {
    //     method: 'POST',
    //     headers: authHeader(),
    //     body: params_temp,
    // });
    // if (result) {
    //     try {
    //         const data = await result.json();
    //         if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
    //         } else {
    //             return data;
    //         }
    //     } catch (error) {
    //         console.log('Error:', error);
    //     }
    // }
    // return 'error';
};

// get-vendor-data api
export const acknowledgeData = async (payload: any) => {
    console.log(payload);
    const apiPath = 'account-setting-v3/account-details-submit.json';
    const params_temp = new URLSearchParams(payload);
    // params_temp.append('user_mobile_token', payload.mobile_token);
    // params_temp.append('mobile_no', payload.phoneNumber);
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
        }
    }
    return 'error';
};

export const verifyOtp = async (payload: any) => {
    const apiPath = 'account-setting-v3/verify-otp-submit.json';
    const params_temp = new URLSearchParams();
    params_temp.append('submit_source', 'otp_modal');
    params_temp.append('step_no', '1');
    params_temp.append('otp_1', payload.otp_1);
    params_temp.append('otp_2', payload.otp_2);
    params_temp.append('otp_3', payload.otp_3);
    params_temp.append('otp_4', payload.otp_4);
    params_temp.append('mobile_token', payload.mobile_token);
    // params_temp.append('vendor_id', '9');
    // params_temp.append('delivery_type', '0');
    // (typeof payload.editId == 'string') ? params_temp.append('edit_id', payload.editId) : params_temp.append('edit_id', payload.editId.id);
    // params_temp.append('edit_id', payload.editId.id);
    // params_temp.append('delivery_type', 'flat');

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            // console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};

export const sendOtp = async () => {
    const apiPath = 'account-setting-v3/send-otp.json';

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
    });
    if (result) {
        try {
            return checkTokenValidation(result);
        } catch (error) {
            // console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};
