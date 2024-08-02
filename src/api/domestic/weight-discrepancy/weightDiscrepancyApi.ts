import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { checkTokenValidation, apiHandler } from '../../common/api';

// For datatable api
// export const dataTableData = async (payload: any, filterPayload: any) => {
//     const apiPath = 'weight-discrepancy/all-view-weight-discrepancy-table-data.json';
//     const params_temp = new URLSearchParams();

//     params_temp.append('is_mounted_load', payload['isMountedLoad']);
//     params_temp.append('filter_discrepancy_date', filterPayload['weight_discrepancy_date']);
//     params_temp.append('filter_discrepancy_date_label', filterPayload['weight_discrepancy_date_label']);
//     params_temp.append('filter_dispute_raised_date', filterPayload['weight_dispute_date']);
//     params_temp.append('filter_dispute_raised_date_label', filterPayload['weight_dispute_date_label']);
//     params_temp.append('filter_order_id', filterPayload['order_id']);
//     params_temp.append('filter_min_amount', filterPayload['order_amount'].min || '');
//     params_temp.append('filter_max_amount', filterPayload['order_amount'].max || '');
//     params_temp.append('filter_min_product_qty', filterPayload['order_product_quantity'].min || '');
//     params_temp.append('filter_max_product_qty', filterPayload['order_product_quantity'].max || '');
//     params_temp.append('filter_order_awb', filterPayload['search_awb_no']);
//     // params_temp.append('filter_product_qty', filterPayload['order_product_quantity']);
//     params_temp.append('start', filterPayload['paginatorStart']);
//     params_temp.append('length', payload['length']);

//     filterPayload['vendor_name'].forEach((value: any) => {
//         params_temp.append('filter_vendor_array[]', value);
//     });

//     filterPayload['awb_no_logistics'].forEach((value: any) => {
//         params_temp.append('filter_shipping[]', value);
//     });
//     filterPayload['weight_discrepancy_status'].forEach((value: any) => {
//         params_temp.append('filter_discrepancy_status[]', value);
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
//             // Handle the error as needed
//         }
//     }
//     return 'error';
// };
// For datatable api

export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/weight-discrepancy/get/data`;
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

export const widgetTitleData = async (payload: any) => {
    const apiPath = 'weight-discrepancy/get-weight-discrepancy-widgets-name-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('is_framework_request', '1');
    params_temp.append('is_mounted_load', payload['isMountedLoad']);
    params_temp.append('length', payload['length']);
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

export const widgetValueData = async (payload: any, filterPayload: any) => {
    const apiPath = 'weight-discrepancy/get-weight-discrepancy-widgets-value-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('is_mounted_load', payload['isMountedLoad']);
    params_temp.append('filter_discrepancy_date', filterPayload['weight_discrepancy_date']);
    params_temp.append('filter_discrepancy_date_label', filterPayload['weight_discrepancy_date_label']);
    params_temp.append('filter_dispute_raised_date', filterPayload['weight_dispute_date']);
    params_temp.append('filter_dispute_raised_date_label', filterPayload['weight_dispute_date_label']);
    params_temp.append('filter_order_id', filterPayload['order_id']);
    params_temp.append('filter_min_amount', filterPayload['order_amount'].min || '');
    params_temp.append('filter_max_amount', filterPayload['order_amount'].max || '');
    params_temp.append('filter_order_awb', filterPayload['search_awb_no']);
    params_temp.append('filter_min_product_qty', filterPayload['order_product_quantity'].min || '');
    params_temp.append('filter_max_product_qty', filterPayload['order_product_quantity'].max || '');
    params_temp.append('start', filterPayload['paginatorStart']);
    params_temp.append('length', payload['length']);

    filterPayload['vendor_name'].forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });

    filterPayload['awb_no_logistics'].forEach((value: any) => {
        params_temp.append('filter_shipping[]', value);
    });
    filterPayload['weight_discrepancy_status'].forEach((value: any) => {
        params_temp.append('filter_discrepancy_status[]', value);
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

    params_temp.append('is_mounted_load', exportPayload.isMountedLoad);
    params_temp.append('filter_discrepancy_date', exportPayload.weight_discrepancy_date);
    params_temp.append('filter_discrepancy_date_label', exportPayload.weight_discrepancy_date_label);
    params_temp.append('filter_dispute_raised_date', exportPayload.weight_dispute_date);
    params_temp.append('filter_dispute_raised_date_label', exportPayload.weight_dispute_date_label);
    params_temp.append('filter_order_id', exportPayload.order_id);
    params_temp.append('filter_min_amount', exportPayload.order_amount.min || '');
    params_temp.append('filter_max_amount', exportPayload.order_amount.max || '');
    params_temp.append('filter_order_awb', exportPayload.search_awb_no);
    params_temp.append('filter_min_product_qty', exportPayload['order_product_quantity'].min || '');
    params_temp.append('filter_max_product_qty', exportPayload['order_product_quantity'].max || '');

    exportPayload.vendor_name.forEach((value: any) => {
        params_temp.append('filter_vendor_array[]', value);
    });

    exportPayload.awb_no_logistics.forEach((value: any) => {
        params_temp.append('filter_shipping[]', value);
    });
    exportPayload.weight_discrepancy_status.forEach((value: any) => {
        params_temp.append('filter_weight_discrepancy_status[]', value);
    });
    exportPayload.selectedCheckbox.forEach((value: any) => {
        params_temp.append('filter_export_checkbox_value[]', value);
    });
    params_temp.append('process_type', exportPayload.processType.processType);
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
    const apiPath = 'weight-discrepancy/get-model-product-details.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
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

export const viewDetailsData = async (payload: any) => {
    const apiPath = 'weight-discrepancy/view-dispute-details-weight-discrepancy-data-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
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

export const getRaiseModal = async (payload: any) => {
    const apiPath = 'weight-discrepancy/get-modal-weight-discrepancy-data-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
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
export const getEditModalData = async (payload: any) => {
    const apiPath = 'weight-discrepancy/get-modal-weight-discrepancy-data-v3.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
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

export const riseDiscrepancyModel = async (payload: any) => {
    const apiPath = 'weight-discrepancy/weight-discrepancy-vender-submit.json';
    const params_temp = new URLSearchParams();

    params_temp.append('om_row_id', payload.rowId);
    params_temp.append('is_accept', payload.isAccept);
    if (payload.isAccept == 0) {
        params_temp.append('is_edit', payload.isEdit);
        params_temp.append('vendor_entered_weight', payload.vendorEnteredWeight);
        params_temp.append('length_image', payload.lengthImage);
        params_temp.append('width_image', payload.widthImage);
        params_temp.append('height_image', payload.heightImage);
        params_temp.append('weight_scale_image', payload.weightScaleImage);
        params_temp.append('label_image', payload.labelImage);
        params_temp.append('product_data', JSON.stringify(payload.productData));
    }

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

export const bulkUploadModal = async (payload: any) => {
    const apiPath = 'common-module-v3/bg-process-import-submit-v3.json';
    const formData = new FormData();
    formData.append('process_type', '153');
    formData.append('file', payload);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: formData,
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
export const imageUpload = async (payload: any) => {
    const apiPath = 'weight-discrepancy/upload-weight-discrepancy-image.json';
    const formData = new FormData();
    formData.append('uploadfile', payload.previewImage);
    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: formData,
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

export const rejectModal = async (payload: any) => {
    const apiPath = 'weight-discrepancy/weight-discrepancy-subadmin-submit.json';
    const formData = new FormData();
    formData.append('om_row_id', payload.rowId);
    formData.append('is_admin_accept', payload.isAdminAccept);
    if (payload.rejectedReason != undefined) {
        formData.append('rejected_reason', payload.rejectedReason);
    } else {
        formData.append('admin_entered_weight', payload.adminEnteredWeight);
    }

    const result = await fetch(config.baseUrlApi + apiPath, {
        method: 'POST',
        headers: authHeader(),
        body: formData,
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
