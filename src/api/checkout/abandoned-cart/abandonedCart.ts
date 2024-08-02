import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { checkTokenValidation, apiHandler } from '../../common/api';

// // For datatable api
// export const dataTableData = async (payload: any, filterPayload: any) => {
//     const apiPath = 'checkout-app/all-view-checkout-abandoned-order-v3-table-data.json';
//     const params_temp = new URLSearchParams();
//     // params_temp.append('filter_store_id', '9');
//     params_temp.append('filter_store_id', filterPayload['storeId']);
//     params_temp.append('filter_platform_id', '2');
//     params_temp.append('filter_order_date', filterPayload['order_date']);
//     params_temp.append('filter_order_date_label', filterPayload['order_dateLabel']);
//     params_temp.append('filter_cart_id', filterPayload['cart_id']);
//     params_temp.append('filter_min_amount', filterPayload['order_amount'].min || '');
//     params_temp.append('filter_max_amount', filterPayload['order_amount'].max || '');
//     params_temp.append('filter_search_cart_id', filterPayload['search_cart_id']);
//     params_temp.append('filter_order_customer_name', filterPayload['order_customer_name']);
//     params_temp.append('filter_order_customer_mobile', filterPayload['order_customer_mobile']);
//     params_temp.append('filter_order_customer_email', filterPayload['order_customer_email']);
//     params_temp.append('filter_min_product_qty', filterPayload['order_product_quantity'].min || '');
//     params_temp.append('filter_max_product_qty', filterPayload['order_product_quantity'].max || '');
//     params_temp.append('start', filterPayload['paginatorStart']);
//     params_temp.append('length', payload.length);

//     filterPayload['vendor_name'].forEach((value: any) => {
//         params_temp.append('filter_vendor_array[]', value);
//     });

//     filterPayload['checkout_stage'].forEach((value: any) => {
//         params_temp.append('filter_checkout_stage[]', value);
//     });
//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: params_temp,
//     });
//     if (result) {
//         try {
//             return checkTokenValidation(result);
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }
//     return 'error';
// };
// For datatable api

// For datatable api data
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/abandoned-checkout/get/data`;
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
    const apiPath = `${config.baseUrlApiNew}api/v1/abandoned-checkout/get/count`;
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
    const apiPath = 'checkout-app/get-checkout-abandoned-widget-name-v3.json';
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
    const apiPath = 'checkout-app/get-checkout-abandoned-widgets-value-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('filter_store_id', filterPayload['storeId']);
    params_temp.append('filter_platform_id', '2');
    params_temp.append('filter_order_date', filterPayload['order_date']);
    params_temp.append('filter_order_date_label', filterPayload['order_dateLabel']);
    params_temp.append('filter_cart_id', filterPayload['cart_id']);
    params_temp.append('filter_min_amount', filterPayload['order_amount'].min || '');
    params_temp.append('filter_max_amount', filterPayload['order_amount'].max || '');
    params_temp.append('filter_search_cart_id', filterPayload['search_cart_id']);
    params_temp.append('filter_order_customer_name', filterPayload['order_customer_name']);
    params_temp.append('filter_order_customer_mobile', filterPayload['order_customer_mobile']);
    params_temp.append('filter_order_customer_email', filterPayload['order_customer_email']);
    params_temp.append('filter_min_product_qty', filterPayload['order_product_quantity'].min || '');
    params_temp.append('filter_max_product_qty', filterPayload['order_product_quantity'].max || '');
    params_temp.append('start', filterPayload['paginatorStart']);
    params_temp.append('length', length);

    filterPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });

    filterPayload['checkout_stage'].forEach((value: any) => {
        params_temp.append('filter_checkout_stage[]', value);
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
    params_temp.append('filter_store_id', exportPayload['store']);
    params_temp.append('filter_platform_id', '2');
    params_temp.append('filter_order_date', exportPayload['order_date']);
    params_temp.append('filter_order_date_label', exportPayload['order_dateLabel']);
    params_temp.append('filter_cart_id', exportPayload['cart_id']);
    params_temp.append('filter_min_amount', exportPayload['order_amount'].min || '');
    params_temp.append('filter_max_amount', exportPayload['order_amount'].max || '');
    params_temp.append('filter_search_cart_id', exportPayload['search_cart_id']);
    params_temp.append('filter_order_customer_name', exportPayload['order_customer_name']);
    params_temp.append('filter_order_customer_mobile', exportPayload['order_customer_mobile']);
    params_temp.append('filter_order_customer_email', exportPayload['order_customer_email']);
    params_temp.append('filter_min_product_qty', exportPayload['order_product_quantity'].min || '');
    params_temp.append('filter_max_product_qty', exportPayload['order_product_quantity'].max || '');

    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });
    exportPayload['selectedCheckbox'].forEach((value: any) => {
        params_temp.append('search_export_checkbox_input_value[]', value);
    });
    exportPayload['checkout_stage'].forEach((value: any) => {
        params_temp.append('filter_checkout_stage[]', value);
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

export const productData = async (payload: any) => {
    const apiPath = 'checkout-app/get-modal-checkout-abandoned-product-details-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('platform_id', '2');
    params_temp.append('platform_row_id', payload.rowId);
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

export const abandonedModalData = async (payload: any) => {
    const apiPath = 'checkout-app/get-checkout-abandoned-modal-order-details-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('platform_id', '2');
    params_temp.append('platform_row_id', payload.rowId);
    params_temp.append('store_id', payload.storeId);
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
