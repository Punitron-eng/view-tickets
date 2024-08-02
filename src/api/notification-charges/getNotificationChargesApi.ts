import config from '../../util/config';
import { authHeader } from '../../util/AuthHeader';
export const getNotificationResponse = async (payload: any) => {
    const apiPath = 'itl-connect-notification/get-itl-connect-plus-charges-details-v3.json';
    const params_temp = new URLSearchParams();
    if (payload.vendorID !== '' && payload.vendorID !== undefined) {
        if (payload.vendorID.platformData !== '' && payload.vendorID.platformData !== undefined) {
            // params_temp.append('platform_id', payload.vendorID['platformData']);
            // params_temp.append('store_id', payload.vendorID['storeData']);
            params_temp.append('vendor_id', payload.vendorID['vendorID']);
        } else {
            params_temp.append('vendor_id', payload.vendorID);
        }
    } else if (payload.platformData !== undefined) {
        // params_temp.append('platform_id', payload.platformData['platformData']);
        // params_temp.append('store_id', payload.platformData['storeData']);
    } else {
        params_temp.append('is_framework_request', payload.framework);
    }
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
export const getPlatformStoreResponce = async (payload: any) => {
    const apiPath = 'itl_connect_notification/get-platform-stores-v3.php';
    const params_temp = new URLSearchParams();
    if (payload.vendorID !== '' && payload.vendorID !== undefined) {
        params_temp.append('vendor_id', payload.vendorID);
        params_temp.append('platform_id', payload.platformId);
    } else {
        params_temp.append('is_framework_request', payload.framework);
        params_temp.append('platform_id', payload.platformId);
        params_temp.append('vendor_id', payload.vendorID);
    }
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

export const getutmSourceDataDetails = async (payload: any) => {
    const apiPath = 'itl_connect_notification/itl-connect-lead-submit.php';
    const params_temp = new URLSearchParams();
    params_temp.append('utm_source', payload.utmSource);
    params_temp.append('utm_medium', payload.utmMedium);
    params_temp.append('utm_content', payload.utmContent);
    params_temp.append('utm_campaign', payload.utmCampaign);
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
