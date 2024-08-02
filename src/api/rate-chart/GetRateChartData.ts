import { apiHandlerWithFormData } from '../common/api';

export const getDefaultRateChartData = async (payload: any) => {
    const apiPath = 'account-setting-v3/get-dom-rate-chart.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const getRateChartData = async (payload: any) => {
    const apiPath = 'account-setting-v3/get-dom-rate-chart.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const getModalData = async (payload: any) => {
    const apiPath = 'account-setting-v3/modal-add-rate-chart-v3.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const postModalData = async (payload: any) => {
    const apiPath = 'account-setting-v3/modal-add-rate-chart-submit.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const deleteRateChart = async (payload: any) => {
    const apiPath = 'account-setting-v3/remove-rate-chart.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const verifyOtp = async (payload: any) => {
    const apiPath = 'account-setting-v3/verify-otp-submit.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const sendOtp = async (payload: any) => {
    const apiPath = 'account-setting-v3/send-otp.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const fetchSericeTypeOfLogistic = async (payload: any) => {
    const apiPath = 'account-setting-v3/get-service-type-data.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const fetchLogisticsByTabType = async (payload: any) => {
    const apiPath = 'account-setting-v3/modal-add-rate-chart-v3.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const setTableDisableApi = async (payload: any) => {
    const apiPath = 'account-setting-v3/modal-add-rate-chart-submit.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const fetchBaseRateChartOnDropdownChange = async (payload: any) => {
    const apiPath = 'all-submit-files-old/get-base-rate-chart.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
}

export const sendMail = async (payload: any) => {
    const apiPath = 'account-setting-v3/send-rates-email.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const copyVendorCodes = async (payload: any) => {
    const apiPath = 'account-setting-v3/copy-vendor-rates.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};

export const fetchVendorDataFromApi = async (payload: any) => {
    const apiPath = 'account-setting-v3/get-user-account-details.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};