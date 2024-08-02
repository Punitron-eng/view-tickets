import { authHeader } from '@/util/AuthHeader';
import config from '@/util/config';
export const getVendorDataApi = async (limit: any, start: any, searchVendorName: string, inputType: string) => {
    const params_temp = new URLSearchParams();

    params_temp.append('limit', limit);
    params_temp.append('start', start);
    params_temp.append('search_vendor_name', searchVendorName);
    params_temp.append('input_type', inputType);

    const apiresponseData = await fetch(config.baseUrlApi + 'common-module-v3/get-vendor-data-v3.json', {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (apiresponseData) {
        return await apiresponseData.json();
    }
    return 'Error';
};
