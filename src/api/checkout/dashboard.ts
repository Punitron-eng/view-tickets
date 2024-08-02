import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';

export const apiDashboard = async (payload: any, path: any) => {
    const apiPath = `checkout-app/checkout-dashboard-${path}-v3.json`;
    console.log(apiPath);

    const params_temp = new FormData();
    params_temp.append('filter_platform_id', payload['platformId']);
    params_temp.append('filter_store_id', payload['storeId']);
    params_temp.append('search_date_label', payload['searchDateLabel']);
    params_temp.append('search_date', payload['searchDate']);
    params_temp.append('device_type', payload['device_type'] || 0);
    params_temp.append('vendor_id', payload['vendor_id']);
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
};

// export const apiVisits =async (payload:any) => {
//     const apiPath = 'checkout_app/checkout-dashboard-visits-v3.php';
//     const params_temp = new FormData();
//     params_temp.append('filter_platform_id',payload['platformId'])
//     params_temp.append('filter_store_id',payload['storeId'])
//     params_temp.append('search_date_label',payload['searchDateLabel'])
//     params_temp.append('search_date',payload['searchDate'])
//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: params_temp,
//     });
//     if (result) {
//         try {
//             const data = await result.json();
//             if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
//             } else {
//                 return data;
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }
// }

// export const apiOrderGraph =async (payload:any) => {
//     const apiPath = 'checkout_app/checkout-dashboard-order-graph-v3.php';
//     const params_temp = new FormData();
//     params_temp.append('filter_platform_id',payload['platformId'])
//     params_temp.append('filter_store_id',payload['storeId'])
//     params_temp.append('search_date_label',payload['searchDateLabel'])
//     params_temp.append('search_date',payload['searchDate'])
//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: params_temp,
//     });
//     if (result) {
//         try {
//             const data = await result.json();
//             if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
//             } else {
//                 return data;
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }
// }
