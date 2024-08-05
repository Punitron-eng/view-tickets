import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { checkTokenValidation, apiHandler } from '../../common/api';

// For datatable api
// export const dataTableData = async (payload: any, filterPayload: any, dtToggleData: any) => {
//     const apiPath = 'product-catalogue-v3/product-catalogue-datatable.json';
//     const params_temp = new URLSearchParams();
//     params_temp.append('start', filterPayload['paginatorStart']);
//     params_temp.append('length', payload.length);
//     params_temp.append('filter_product_name', filterPayload['product_name']);
//     params_temp.append('filter_product_sku', filterPayload['product_sku']);
//     params_temp.append('filter_date', filterPayload['product_last_updated_date']);
//     params_temp.append('filter_date_label', filterPayload['product_last_updated_dateLabel']);
//     params_temp.append('filter_product_master_name_sku', filterPayload['search_product_name']);
//     filterPayload['vendor_name'].forEach((value: any) => {
//         params_temp.append('filter_vendor_array[]', value);
//     });
//     params_temp.append('filter_platform', filterPayload['platform_name'][0] || '');
//     params_temp.append('filter_store_id', filterPayload['store'][0] || '');

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
//             // Handle the error as needed
//         }
//     }
//     return 'error';
// };

// For datatable api data
// export const dataTableData = async (data, filterPayload) => {
// const apiPath = data.selectedTab == 'rev_return_request' ? 'reverse-order-v3/all-view-request-reverse-order-v4-table-data.json' : `${config.baseUrlApiNew}api/v1/order/reverse/get/data`;
//     // const apiPath = `${config.baseUrlApiNew}api/v1/product-catalogue/get/data`;
//     const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && String(value).length > 0 && JSON.stringify(value) !== JSON.stringify({})));
//     const payload = {
//         module_name: data.moduleName,
//         tab_name: data.selectedTab,
//         sub_tab_name: data.subTabName,
//         is_active_sub_tab_filter: data.is_active_sub_tab_filter,
//         page_start: filterPayload.paginatorStart,
//         page_count: data.length,
//         filter_payload: filteredPayload,
//     };

//     const result = await apiHandler(apiPath, payload);
//     return result;
// };

export const dataTableData = async (data, filterPayload) => {
    const apiPath = data.selectedTab == 'rev_return_request' ? 'reverse-order-v3/all-view-request-reverse-order-v4-table-data.json' : `${config.baseUrlApiNew}api/v1/order/reverse/get/data`;
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

export const exportBgProcess = async (exportPayload: any, dtToggleData: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('tab_name', exportPayload.selectedTab);
    params_temp.append('filter_search_order_awb', exportPayload['search']);
    params_temp.append('filter_order_id', exportPayload['order_id']);
    params_temp.append('filter_min_product_qty', exportPayload['order_product_quantity'].min || '');
    params_temp.append('filter_max_product_qty', exportPayload['order_product_quantity'].max || '');
    params_temp.append('filter_order_customer_name', exportPayload['order_customer_name']);
    params_temp.append('filter_order_customer_mobile', exportPayload['order_customer_mobile']);
    params_temp.append('filter_order_customer_email', exportPayload['order_customer_email']);
    if (exportPayload.selectedTab == 'rev_return_request') {
        params_temp.append('filter_requested_date', exportPayload['requestedDate']);
        params_temp.append('filter_requested_date_label', exportPayload['requestedDateLable']);
        params_temp.append('filter_rejected_date', exportPayload['rejectedDate']);
        params_temp.append('filter_rejected_date_label', exportPayload['rejectedDateLable']);
        params_temp.append('filter_min_amount', exportPayload['refundAmount'].min || '');
        params_temp.append('filter_max_amount', exportPayload['refundAmount'].max || '');
        params_temp.append('filter_requested_rejected', dtToggleData['requested_rejected']);
        params_temp.append('filter_origin_warehouse', exportPayload['origin_warehouse'] || '');
        exportPayload['returnReason'].forEach((value: any) => {
            params_temp.append('filter_return_reason[]', value);
        });
    } else {
        params_temp.append('filter_order_date', exportPayload['order_date']);
        params_temp.append('filter_order_date_label', exportPayload['orderDateLable']);
        params_temp.append('filter_min_amount', exportPayload['order_amount'].min || '');
        params_temp.append('filter_max_amount', exportPayload['order_amount'].max || '');
        params_temp.append('filter_delivery_warehouse', exportPayload['delivery_warehouse'] || '');
    }
    if (exportPayload.selectedTab == 'rev_manifest') {
        params_temp.append('filter_pending_complete', dtToggleData['pending_complete']);
    }
    if (exportPayload.selectedTab != 'rev_return_request') {
        exportPayload['awb_no_logistics'].forEach((value: any) => {
            params_temp.append('filter_logistics[]', value);
        });
        params_temp.append('filter_order_customer_name', exportPayload['order_customer_name']);
        params_temp.append('filter_order_customer_mobile', exportPayload['order_customer_mobile']);
        params_temp.append('filter_order_customer_email', exportPayload['order_customer_email']);
    }
    if (exportPayload.selectedTab != 'rev_return_request' && exportPayload.selectedTab != 'rev_delivered') {
        exportPayload['status'].forEach((value: any) => {
            params_temp.append('filter_status[]', value);
        });
    }
    exportPayload['order_type'].forEach((value: any) => {
        params_temp.append('filter_payment[]', value);
    });
    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });
    exportPayload['selectedCheckbox'].forEach((value: any) => {
        params_temp.append('filter_export_checkbox_value[]', value);
    });
    params_temp.append('process_type', exportPayload.selectedTab == 'rev_return_request' ? '164' : '14');
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
// for databtable Tab
export const getDataTableTab = async (payload: any) => {
    const apiPath = 'common-module-v3/get-dt-tab-name.json';
    const params_temp = new URLSearchParams();
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        // body: params_temp,
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
// for databtable Tab

export const productData = async (payload: any) => {
    const apiPath = 'reverse-order-v3/get-modal-product-details-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('module_name', payload.moduleName);
    params_temp.append('tab_name', payload.selectedTab);
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

export const viewDetailsApi = async (payload: any) => {
    const apiPath = 'common-module-v3/get-modal-order-detail-v4.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('module_name', payload.moduleName);
    params_temp.append('tab_name', payload.selectedTab);
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
export const activityApi = async (payload: any) => {
    const apiPath = 'common-module-v3/get-modal-activity-detail-v4.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('module_name', payload.moduleName);
    params_temp.append('tab_name', payload.selectedTab);
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

export const rejectDetailsApi = async (payload: any) => {
    const apiPath = 'reverse-order-v3/return-request-reject-submit.json';
    const params_temp = new URLSearchParams();

    params_temp.append('row_id', payload.rowId);
    params_temp.append('cancel_reason', payload.rejectInput);
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

export const pickNowDetailsApi = async (payload: any) => {
    const apiPath = 'reverse-order-v3/get-modal-rev-pick-now-details.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('is_change_courier_priority', payload.changeCourierPriority);
    params_temp.append('courier_priority', payload.courierPriority);
    params_temp.append('tab_name', payload.tabName);
    params_temp.append('applied_weight', payload.appliedWeight);
    params_temp.append('ship_length', payload.shipLength);
    params_temp.append('ship_width', payload.shipWidth);
    params_temp.append('ship_height', payload.shipHeight);
    params_temp.append('selected_delivered_id', payload.deliveredId);
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

export const pickNowSubmitData = async (payload: any) => {
    const apiPath = 'view-order-v3/ship-now-order-submit-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('tab_name', payload.tabName);
    params_temp.append('applied_weight', payload.appliedWeight);
    params_temp.append('ship_length', payload.shipLength);
    params_temp.append('ship_width', payload.shipWidth);
    params_temp.append('ship_height', payload.shipHeight);
    params_temp.append('selected_delivered_id', payload.deliveredId);
    params_temp.append('logistic_id', payload.logisticId);
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

export const cancelOrderApi = async (payload: any) => {
    const apiPath = 'view-order-v3/cancel-order-v3-submit.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('type', '2');
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

export const warehouseApi = async (payload: any) => {
    const apiPath = 'view-order-v3/get-warehouse-data-by-vendor-id.json';
    const params_temp = new URLSearchParams();
    params_temp.append('vendor_id', payload.vendor_id);
    params_temp.append('module_name', payload.module_name);
    params_temp.append('tab_name', payload.tab_name);
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

export const getCityStateApi = async (payload: any) => {
    const apiPath = 'view-order-v3/get-state-city-selection.json';
    const params_temp = new URLSearchParams();

    params_temp.append('pincode', payload.pincode);
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

export const submitPickNowApi = async (payload: any) => {
    const apiPath = 'reverse_order_v3/bulk-pick-now-order-submit-v3.php';
    const params_temp = new URLSearchParams();
    params_temp.append('vendor_id', payload.vendor_id);
    params_temp.append('warehouse_address_id', payload.warehouse_address_id);
    params_temp.append('process_type', payload.process_type);
    payload['order_id_array'].forEach((value: any) => {
        params_temp.append('order_id_array[]', value);
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
export const getWeightApiData = async (payload: any) => {
    const apiPath = 'reverse-order-v3/modal-update-order-details-v4-submit.json';
    const params_temp = new URLSearchParams(payload);
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
export const exportOrderCount = async (payload: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams(payload);
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
