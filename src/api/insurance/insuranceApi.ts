import { apiHandlerWithFormData } from '../common/api';

export const fetchInsurance = async () => {
    const apiPath = 'view-insurance-v3/get-insurance-header-data-v3.json';
    const result = await apiHandlerWithFormData(apiPath);
    return result;
};

export const activateInsuranceApi = async (payload: any) => {
    const apiPath = 'account-setting-v3/insurance-policy-submit-v3.json';
    const result = await apiHandlerWithFormData(apiPath, payload);
    return result;
};
