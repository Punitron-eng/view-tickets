import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { apiHandler, checkTokenValidation } from '../../common/api';
import { addFilterData } from '../../datatable/dataTableApi';

// For datatable api
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/product-catalogue/get/data`;
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

export const exportBgProcess = async (exportPayload: any) => {
    const apiPath = 'common-module-v3/bg-process-export-submit-v3.json';
    const params_temp = new URLSearchParams();

    exportPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });
    params_temp.append('filter_store_id', exportPayload['store']['0'] || '');
    params_temp.append('filter_product_name', exportPayload['product_name']);
    params_temp.append('filter_product_master_name_sku', exportPayload['search_product_name']);
    params_temp.append('filter_product_sku', exportPayload['product_sku']);
    params_temp.append('filter_platform', exportPayload['platform_name']['0']);
    params_temp.append('filter_date', exportPayload['product_last_updated_date']);
    params_temp.append('process_type', '169');
    exportPayload['selectedCheckbox'].forEach((value: any) => {
        params_temp.append('row_id[]', value);
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

export const productData = async (payload: any) => {
    const url = `${config.baseUrlApi}reverse-order-v3/get-modal-product-details-v3.json`;
    const result = await apiHandler(url, payload);
    return result;
};

export const getChannelInventoryProduct = async (payload: any) => {
    const url = `${config.baseUrlApi}product-catalogue-v3/get-channel-inventory-product.json`;
    const result = await apiHandler(url, payload);
    return result;
};

export const fetchProductSubmitApi = async (payload: any) => {
    const url = `${config.baseUrlApi}product-catalogue-v3/product-catalogue-submit-v3.json`;
    const result = await apiHandler(url, payload);
    return result;
};

export const imageUpload = async (payload: any) => {
    const url = `${config.baseUrlApi}product-catalogue-v3/upload-product-image.json`;
    const result = await apiHandler(url, payload, true);
    return result;
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

export const fetchChannels = async (payload: any) => {
    // const apiPath = `${config.baseUrlApi}common_module_v3/get-user-platform-list-v3.php`;
    // const result = await apiHandler(apiPath, payload);
    // return result;

    const apiPath = 'common_module_v3/get-user-platform-list-v3.php';
    const params_temp = new URLSearchParams();
    // params_temp.append('vendor_id', payload.vendor_id);
    params_temp.append('module', payload.module);
    // params_temp.append('platform_id', payload.platform_id);
    payload['vendor_id'].forEach((value: any) => {
        params_temp.append('vendor_id[]', value);
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

export const fetchStores = async (payload: any) => {
    const apiPath = `${config.baseUrlApi}common_module_v3/get-user-store-list-v3.php`;
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const syncOrders = async (payload: any) => {
    const apiPath = `${config.baseUrlApi}product_catalogue_v3/sync-platform-product.php`;
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const fetchCategoryApi = async () => {
    const url = `${config.baseUrlApi}product-catalogue-v3/get-product-category-master.json`;
    const result = await apiHandler(url);
    return result;
};

export const bgProcessImportSubmit = async (payload: any) => {
    const url = `${config.baseUrlApi}common-module-v3/bg-process-import-submit-v3.json`;
    const result = await apiHandler(url, payload, true);
    return result;
};

export const updateByCategoryMaster = async (payload: any) => {
    // const apiPath = `${config.baseUrlApi}common_module_v3/get-user-platform-list-v3.php`;
    // const result = await apiHandler(apiPath, payload);
    // return result;

    const apiPath = 'product_catalogue_v3/bulk-update-product-category-submit.php';
    const params_temp = new URLSearchParams();
    // params_temp.append('vendor_id', payload.vendor_id);
    params_temp.append('category_id', payload.productCategory);
    params_temp.append('platform_id', payload.platform_id);
    params_temp.append('store_id', payload.store_id);
    params_temp.append('vendor_id', payload.vendor_id[0]);
    // payload['vendor_id'].forEach((value: any) => {
    //     params_temp.append('vendor_id[]', value);
    // });
    payload['selectedCheckBoxes'].forEach((value: any) => {
        params_temp.append('row_id[]', value);
    });
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: params_temp,
    });
    if (result) {
        try {
            const data = await result.json();
            if (data.status == 'error' && (data.html_message == 'Access Denied' || data.html_message == 'Please Login')) {
                // sessionStorage.clear();
                // window.location.href = config.baseUrlPanel+'login';
            } else {
                return data;
            }
        } catch (error) {
            console.log('Error:', error);
            // Handle the error as needed
        }
    }
    return 'error';
};
