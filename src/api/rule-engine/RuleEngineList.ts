import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { apiHandlerWithFormData, apiHandlerWithJson } from '../common/api';
// get Selected Vendor rules list data
export const getRuleListData = async (payload: any) => {
    const url = 'rule-engine/get-rule-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

export const updateRuleList = async (payload: any) => {
    const url = 'rule-engine/update-rule-priority.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};
export const cloneRuleList = async (payload: any) => {
    const url = 'rule-engine/get-order-cloning-rule-data.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};
// export const updateRuleList = async (payload: any) => {
//     console.log('payload', payload);
//     const apiPath = 'rule-engine/update-rule-priority.json';
//     const params_temp = new URLSearchParams();
//     // if (payload.user_type == 1 || payload.user_type == 2) {
//     // admin and sub-admin
//     for (const key in payload) {
//         params_temp.append(key, payload[key]);
//     }
//     // params_temp.append('vendor_id', ...payload.vendor_id);
//     // params_temp.append('update_priority', JSON.stringify(payload.update_priority));
//     // }

//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: params_temp,
//     });

//     if (result) {
//         try {
//             const data = await result.json();
//             console.log('api data', data);
//             if ((data.status = 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login'))) {
//                 return data;
//             }
//         } catch (error) {
//             console.log('Error', error);
//         }
//     }
//     return 'error';
// };

// fetch logistics data
export const getLogisticsData = async (payload: any) => {
    const url = 'rule-engine/get-logistics-priority-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// fetch api for channel
export const fetchChannelApi = async (payload: any) => {
    const url = 'rule-engine/get-channel-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// fetch api for warehouse
export const fetchWarehouseApi = async (payload: any) => {
    const url = 'rule-engine/get-warehouse-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// fetch api for store
export const fetchStoreApi = async (payload: any) => {
    const url = 'rule-engine/get-store-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// fetch api for state and city
export const fetchStateCityApi = async (payload: any) => {
    const url = 'rule-engine/get-state-list.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// fetch api for update status
export const getUpdateStatus = async (payload: any) => {
    const url = 'rule-engine/update-rule-status.json';
    const result = await apiHandlerWithFormData(url, payload);
    return result;
};

// on save/add new rule api call
export const addRule = async (payload: any) => {
    const url = 'rule-engine/add-rule.json';
    const data = JSON.stringify(payload);
    const result = await apiHandlerWithJson(url, data, true);
    return result;
};
