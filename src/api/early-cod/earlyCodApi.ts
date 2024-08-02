import { apiHandler, apiHandlerWithFormData } from '../common/api'; 

export const getDefaultData = async (payload:any) => {
    const apiPath = 'early-cod-to-prepaid-v3/get-modal-early-cod-to-prepaid.json';
    const result = await apiHandlerWithFormData(apiPath,payload);
    return result;
};

export const updateRemittancePlan = async (payload:any) => {
    const apiPath = 'early-cod-to-prepaid-v3/update-cod-remittance-plan-submit.json';
    const result = await apiHandlerWithFormData(apiPath,payload);
    return result;
};

// export const getDefaultData = async () => {
//     const apiPath = 'early-cod-to-prepaid-v3/get-modal-early-cod-to-prepaid.json';
//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//     });
//     if (result) {
//         try {
//             const data = await result.json();
//             // return data;
//             if (data.status == 'error') {
//                 if (data.html_message == 'Access Denied' || data.html_message == 'Please Login') {
//                     localStorage.clear();
//                     window.location.href = config.baseUrlPanel + 'login';
//                 }
//                 return data;
//             } else {
//                 return data;
//             }
//         } catch (error) {
//             console.log('Error:', error);
//             // Handle the error as needed
//         }
//     }
//     return 'error';
// }


// export const updateRemittancePlan = async (payload: any) => {
//     const apiPath = 'early-cod-to-prepaid-v3/update-cod-remittance-plan-submit.json';

//     const params_temp = new URLSearchParams();
//     params_temp.append('rem_active_plan_id', payload.rem_active_plan_id);
//     params_temp.append('rem_plan_type', payload.rem_plan_type);
//     params_temp.append('terms_condition_status', payload.terms_condition_status);

//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: params_temp,
//     });

//     if (result) {
//         try {
//             const data = await result.json();
//             // return data;
//             if (data.status == 'error') {
//                 if (data.html_message == 'Access Denied' || data.html_message == 'Please Login') {
//                     localStorage.clear();
//                     window.location.href = config.baseUrlPanel + 'login';
//                 }
//                 return data;
//             } else {
//                 return data;
//             }
//         } catch (error) {
//             console.log('Error:', error);
//             // Handle the error as needed
//         }
//     }
//     return 'error';
// };