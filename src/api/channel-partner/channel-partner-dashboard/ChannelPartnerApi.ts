import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { checkTokenValidation } from '../../common/api';

export const getDefaultChartData = async (payload: any) => {
    // console.log(payload, 'eygcrycgyugyuvg')
    const apiPath = 'channel-dashboard-v3/channel-dashboard-data.json';
    const params_temp = new URLSearchParams();
    // params_temp.append('filter_date', '2022-02-02 2023-11-11');
    params_temp.append('filter_date', payload.filter_date);
    params_temp.append('delivery_type', '0');
    // params_temp.append('search_vendor_name_checkbox_value', '9')

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

export const getChartData = async (payload: any) => {
    const apiPath = 'channel-dashboard-v3/channel-dashboard-data.json';
    const params_temp = new URLSearchParams();
    params_temp.append('filter_date', payload.filter_date);
    params_temp.append('delivery_type', payload.delivery_type);

    payload.vendor_ids.forEach((ele: any) => {
        params_temp.append('search_vendor_name_checkbox_value[]', ele);
    });

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

export const fetchWidgetsNames = async (payload: any) => {
    const apiPath = 'channel-dashboard-v3/get-channel-dashbord-widget-name-v3.json';
    const params_temp = new URLSearchParams();
    // params_temp.append('filter_date', payload.filter_date);
    // params_temp.append('delivery_type', payload.delivery_type);

    // payload.vendor_ids.forEach((ele: any) => {
    //     params_temp.append('search_vendor_name_checkbox_value[]', ele);
    // })

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

export const fetchWidgetsValues = async (payload: any) => {
    const apiPath = 'channel-dashboard-v3/get-channel-dashboard-widget-value-v3.json';
    const params_temp = new URLSearchParams();
    // params_temp.append('filter_date', payload.filter_date);
    // params_temp.append('delivery_type', payload.delivery_type);

    // payload.vendor_ids.forEach((ele: any) => {
    //     params_temp.append('search_vendor_name_checkbox_value[]', ele);
    // })
    // params_temp.append('filter_date', payload.filter_date);
    // params_temp.append('delivery_type', payload.delivery_type);

    // payload.vendor_ids.forEach((ele: any) => {
    //     params_temp.append('search_vendor_name_checkbox_value[]', ele);
    // })

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
