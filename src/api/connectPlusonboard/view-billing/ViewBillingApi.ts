import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { checkTokenValidation, apiHandler } from '../../common/api';

// For datatable api data
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/notification-billing/get/data`;
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
    const apiPath = `${config.baseUrlApiNew}api/v1/notification-billing/get/count`;
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

export const widgetTitleData = async (length: any) => {
    const apiPath = 'itl-connect-notification/itl-get-notification-charges-widgets-name-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('is_framework_request', '1');
    params_temp.append('length', length);
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

export const widgetValueData = async (length: any, filterPayload: any) => {
    const apiPath = 'itl-connect-notification/itl-get-notification-charges-widgets-value-v3.json';
    const params_temp = new URLSearchParams();
    params_temp.append('is_framework_request', '1');
    params_temp.append('filter_search_order_awb', filterPayload['search_awb_no']);
    params_temp.append('start', filterPayload['paginatorStart']);
    params_temp.append('length', length);
    params_temp.append('filter_order_date', filterPayload['order_date']);
    params_temp.append('filter_order_date_label', filterPayload['order_dateLabel']);
    params_temp.append('filter_invoice_date', filterPayload['invoice_date']);
    params_temp.append('filter_invoice_date_label', filterPayload['invoice_dateLabel']);
    params_temp.append('filter_invoice_id', filterPayload['invoice_id']);
    params_temp.append('filter_order_id', filterPayload['order_id']);
    // params_temp.append('filter_awb_no[]', filterPayload['awb_no']);
    filterPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });
    if (filterPayload['awb_no_logistics'] !== undefined) {
        filterPayload['awb_no_logistics'].forEach((value: any) => {
            params_temp.append('filter_logistics[]', value);
        });
    }

    filterPayload['tracking_status'].forEach((value: any) => {
        params_temp.append('filter_status_array[]', value);
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
            // Handle the error as needed
        }
    }
    return 'error';
};

export const exportBgProcess = async (exportPayload: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams();
    console.log(exportPayload, 'getSelectedRow');
    params_temp.append('is_framework_request', '1');
    params_temp.append('filter_order_date', exportPayload['order_date']);
    params_temp.append('filter_search_order_awb', exportPayload['search_awb_no']);
    params_temp.append('filter_order_date_label', exportPayload['order_dateLabel']);
    params_temp.append('filter_invoice_date', exportPayload['invoice_date']);
    params_temp.append('filter_invoice_date_label', exportPayload['invoice_dateLabel']);
    params_temp.append('filter_invoice_id', exportPayload['invoice_id']);
    params_temp.append('filter_order_id', exportPayload['order_id']);
    // params_temp.append('filter_awb_no', exportPayload['awb_no']);
    exportPayload['tracking_status'].forEach((value: any) => {
        params_temp.append('filter_status_array[]', value);
    });
    if (exportPayload['awb_no_logistics'] !== undefined) {
        exportPayload['awb_no_logistics'].forEach((value: any) => {
            params_temp.append('filter_logistics[]', value);
        });
    }

    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
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
