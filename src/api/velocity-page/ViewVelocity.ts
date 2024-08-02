import { authHeader } from '../../util/AuthHeader';
import config from '../../util/config';
import { checkTokenValidation } from '../common/api';

// For Default Column
export const getDefaultColumnData = async () => {
    const apiPath = 'common-module-v3/get-user-customized-column.json';
    const params_temp = new URLSearchParams();
    params_temp.append('module_name', 'velocity');
    params_temp.append('tab_name', '');
    params_temp.append('sequence', '');

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
// For Default Column

// For Customized Column
export const getColumnData = async (columnPayload: any) => {
    const apiPath = 'common-module-v3/save-user-customized-column.json';
    const params_temp = new URLSearchParams();
    params_temp.append('is_framework_request', '1');
    params_temp.append('new_customized_column_list', columnPayload['newColumns'].join(',') + '||' + columnPayload['size']);
    params_temp.append('module_name', 'billing');
    params_temp.append('tab_name', '');
    params_temp.append('module_page_count', columnPayload['page']);

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
// For Customized Column

// For datatable api
export const dataTableData = async (length: any, filterPayload: any) => {
    const apiPath = 'velocity_v3/all-view-velocity-table-data-v3.php';
    const params_temp = new URLSearchParams();

    params_temp.append('start', filterPayload['paginatorStart']);
    params_temp.append('length', length);
    params_temp.append('filter_created_date', filterPayload['applied_on']);
    // params_temp.append('filter_order_date_label', filterPayload['orderDateLable']);
    // params_temp.append('order_date_sort', filterPayload['order_date_sort']);
    // params_temp.append('invoice_date_sort', filterPayload['invoice_date_sort']);
    params_temp.append('page_count_billing', filterPayload['page_count_velocity']);

    filterPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });

    filterPayload['status'].forEach((value: any) => {
        params_temp.append('filter_velocity_status_array[]', value);
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
// For datatable api

export const exportBgProcess = async (exportPayload: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('is_framework_request', '1');
    params_temp.append('filter_order_date', exportPayload['order_date']);
    params_temp.append('filter_search_order_awb', exportPayload['search']);
    params_temp.append('filter_order_date_label', exportPayload['orderDateLable']);
    params_temp.append('filter_invoice_date', exportPayload['invoiceDate']);
    params_temp.append('filter_invoice_id', exportPayload['invoice_id']);
    params_temp.append('filter_order_id', exportPayload['order_id']);
    // params_temp.append('filter_awb_no', exportPayload['awb_no']);
    exportPayload['status'].forEach((value: any) => {
        params_temp.append('filter_status_array[]', value);
    });
    if (exportPayload['awb_no'] !== undefined) {
        exportPayload['awb_no'].forEach((value: any) => {
            params_temp.append('filter_logistic_id[]', value);
        });
    }

    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });
    params_temp.append('process_type', exportPayload['processType']);
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
