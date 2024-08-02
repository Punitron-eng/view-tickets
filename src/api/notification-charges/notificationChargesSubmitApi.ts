import config from '@/util/config';
import { authHeader } from '@/util/AuthHeader';
export const notificationSubmitResponse = async (payloadData: any) => {
    const apiPath = 'itl-connect-notification/submit-itl-connect-plus-charges-details-v3.json';
    const params_temp = new URLSearchParams();
    if (payloadData.mode === 'connect_plus') {
        params_temp.append('mode', payloadData.mode);
        params_temp.append('connect_plus_activated', payloadData.connectPlusActivated);
        params_temp.append('connect_plus_charges', payloadData.connectPlusCharges);
        params_temp.append('billing_date', payloadData.billingDate);
        if (payloadData.vendorID !== '' && payloadData.vendorID !== undefined) {
            params_temp.append('vendor_id', payloadData.vendorID);
        } else {
            params_temp.append('is_framework_request', payloadData.framework);
        }
    } else if (payloadData.mode === 'post_shipping') {
        params_temp.append('mode', payloadData.mode);
        params_temp.append('is_wismo', payloadData.is_wismo);
        params_temp.append('connect_plus_charges', payloadData.connect_plus_charges);

        // params_temp.append('connect_plus_activated', payloadData.connectPlusActivated);
        // params_temp.append('connect_plus_charges', payloadData.perOrderAmount);
        if (payloadData.vendorID !== '' && payloadData.vendorID !== undefined) {
            params_temp.append('vendor_id', payloadData.vendorID);
        } else {
            // params_temp.append('is_framework_request', payloadData.framework);
        }
        for (const key in payloadData.post_shipping) {
            if (Object.prototype.hasOwnProperty.call(payloadData.post_shipping, key)) {
                const value = payloadData.post_shipping[key];
                if (typeof value === 'object') {
                    for (const nestedKey in value) {
                        if (Object.prototype.hasOwnProperty.call(value, nestedKey)) {
                            params_temp.append(`post_shipping[${key}][${nestedKey}]`, value[nestedKey]);
                        }
                    }
                } else {
                    params_temp.append(`post_shipping[${key}]`, value);
                }
            }
        }
    }
    // params_temp.append('user_id', userId);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            const data = await result.json();
            if (data.status == 'error') {
                if (data.html_message == 'Access Denied' || data.html_message == 'Please Login') {
                    localStorage.clear();
                    window.location.href = config.baseUrlPanel + 'login';
                }
                return data;
            } else {
                return data;
            }
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};
