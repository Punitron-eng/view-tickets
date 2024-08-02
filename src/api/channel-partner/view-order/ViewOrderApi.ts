import config from '../../../util/config';
import { apiHandler } from '../../common/api';
import { checkTokenValidation } from '../../common/api';
import { authHeader } from '../../../util/AuthHeader';

// For datatable api data
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/channel-partner/order/get/data`;
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && value.length > 0 && JSON.stringify(value) !== JSON.stringify({})));
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

// for datatable api data count
export const dataCount = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/channel-partner/order/get/count`;
    const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && value.length > 0 && JSON.stringify(value) !== JSON.stringify({})));
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

export const exportBgProcess = async (exportPayload: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('filter_order_date', exportPayload['order_date']);
    params_temp.append('filter_order_date_label', exportPayload['order_dateLabel']);
    params_temp.append('filter_order_id', exportPayload['order_id']);
    params_temp.append('filter_delivery_type', exportPayload['filter_delivery_type']);

    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });

    if (exportPayload['awb_no_logistics'] !== undefined) {
        exportPayload['awb_no_logistics'].forEach((value: any) => {
            params_temp.append('filter_shipping[]', value);
        });
    }
    exportPayload['tracking_status'].forEach((value: any) => {
        params_temp.append('filter_status[]', value);
    });
    exportPayload['tracking_status_intl'].forEach((value: any) => {
        params_temp.append('filter_status[]', value);
    });
    params_temp.append('process_type', exportPayload['processType'].processType);
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
            // Handle the error as needed
        }
    }
    return 'error';
};
