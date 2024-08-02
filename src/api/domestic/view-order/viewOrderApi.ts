import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { apiHandler, checkTokenValidation } from '../../common/api';
import { addFilterData } from '../../datatable/dataTableApi';

// For datatable api
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/order/forward/get/data`;
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && String(value).length > 0 && JSON.stringify(value) !== JSON.stringify({})));
    const payload = {
        module_name: data.moduleName,
        tab_name: data.selectedTab,
        sub_tab_name: data.subTabName,
        is_active_sub_tab_filter: data.is_active_sub_tab_filter,
        page_start: filterPayload.paginatorStart,
        page_count: data.length,
        filter_payload: filteredPayload,
    };

    const result = await apiHandler(apiPath, payload);
    return result;
};

export const exportBgProcess = async (data, filterPayload, selectedCheckboxData) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/datatable/export`;
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && value.length > 0 && JSON.stringify(value) !== JSON.stringify({})));
    const payload = {
        module_name: data.moduleName,
        tab_name: data.selectedTab,
        sub_tab_name: data.subTabName,
        is_active_sub_tab_filter: data.is_active_sub_tab_filter,
        filter_payload: filteredPayload,
    };
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const storeDropdownDetails = async () => {
    const apiPath = 'checkout-app/get-dropdown-store-details.json';
    const params_temp = new URLSearchParams();
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
