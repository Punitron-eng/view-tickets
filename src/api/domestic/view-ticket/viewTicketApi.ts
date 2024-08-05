import { authHeader } from '../../../util/AuthHeader';
import config from '../../../util/config';
import { apiHandler, checkTokenValidation, apiHandlerWithFileNew } from '../../common/api';
import store from '@/store/index';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { dataTableVariables as dataVariables } from '../../../components/itl-dataTable-files/itl-dataTable/commonVariable';

// For datatable api
export const dataTableData = async (data, filterPayload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/data`;
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
// export const dataTableData = async (data, filterPayload) => {
//     const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/data`;
//     const payload = {
//         module_name: data.moduleName,
//         tab_name: data.selectedTab,
//         sub_tab_name: data.subTabName,
//         is_active_sub_tab_filter: data.is_active_sub_tab_filter,
//         page_start: filterPayload.paginatorStart,
//         page_count: data.length,
//     };
//     const filteredPayload = Object.fromEntries(Object.entries(filterPayload).filter(([key, value]) => value !== '' && value !== null && value !== undefined && value.length > 0 && JSON.stringify(value) !== JSON.stringify({})));
//     Object.assign(payload, filteredPayload);
//     const result = await apiHandler(apiPath, payload);
//     return result;
// };

export const ticketDepartmentApiCall = async (id, modal) => {
    if (modal.ticket_department) {
        const data = { id, modalValue: modal };
        await store.commit(`${NEWVIEWTICKET.NAME}/setTicketDepartmentId`, data);
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
        modal.ticket_category = '';
    }
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
    // since the checkbox is removed from the dt table, we are not using it anymore
    // const selectedCheckboxExportData = selectedCheckboxData.selectedCheckbox;
    // if (selectedCheckboxExportData.length > 0) {
    //     payload.selectedCheckbox = selectedCheckboxExportData;
    // }
    const result = await apiHandler(apiPath, payload);
    return result;
};

export const productData = async (payload: any) => {
    const apiPath = 'weight-discrepancy/get-model-product-details.json';
    // const apiPath = 'itl_connect_notification/itl-get-notification-charges-widgets-v3.json';
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
    // const apiPath = 'itl_connect_notification/itl-get-notification-charges-widgets-v3.json';
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

// export const bulkUploadModal = async (payload: any) => {
//     const apiPath = 'common-module-v3/bg-process-import-submit-v3.json';
//     const formData = new FormData();
//     formData.append('process_type', '176');
//     formData.append('input_bulk_upload', payload);
//     const result = await fetch(config.baseUrlApi + apiPath, {
//         method: 'POST',
//         headers: authHeader(),
//         body: formData,
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

export const getChatTicketModalData = async (selectedTicketId: any) => {
    const payload = {
        ticket_id: selectedTicketId,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/details`;
    const ticketData = await apiHandler(apiPath, payload);
    const attachment = await getChatTicketModalAttachmentData(selectedTicketId);
    const chat = await getChatTicketModalChatData(selectedTicketId, 0);
    return { ticketData, attachment, chat };
};
export const getChatTicketModalAttachmentData = async (selectedTicketId: any) => {
    const payload = {
        ticket_id: selectedTicketId,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/attachment`;
    return await apiHandler(apiPath, payload);
};
export const getChatTicketModalChatData = async (selectedTicketId: any, pageStart: any) => {
    const payload = {
        ticket_id: selectedTicketId,
        page_start: pageStart,
        page_count: 10,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/chat`;
    return await apiHandler(apiPath, payload);
};

// New Ticket airwayBillNo Api
export const getairwayBillNoDetails = async (awbNo: any) => {
    const payload = {
        awb_no: awbNo,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/order/details`;
    return await apiHandler(apiPath, payload);
};

// New Ticket department api
export const getDepartmentOptionsApi = async () => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/department`;
    return await apiHandler(apiPath);
};

// New Ticket category api
export const getCategoryOptionsApi = async (catPayload) => {
    const payload = {};

    if (catPayload.awb_no) {
        payload.awb_no = catPayload.awb_no;
    }

    payload.department_id = catPayload.department_id;
    // const payload = {
    //     awb_no: catPayload.awb_no,
    //     department_id: catPayload.department_id,
    // };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/get/category`;
    return await apiHandler(apiPath, payload);
};

// New Ticket file upload
export const getFileUploadApi = async (uploadFile) => {
    const payload = {
        upload_file: uploadFile,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/uploadDocs`;
    return await apiHandlerWithFileNew(apiPath, payload);
};
// close ticket api
export const closeTicketApi = async (selectedTicketId: number) => {
    const payload = {
        ticket_id: selectedTicketId,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/close`;
    return await apiHandler(apiPath, payload);
};
// Reopen ticket api
export const reopenTicketApi = async (payload) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/reopen`;
    return await apiHandler(apiPath, payload);
};
// review ticket api
export const reviewTicketApi = async (selectedTicketId: number, ticketReivew: number) => {
    const payload = {
        ticket_id: selectedTicketId,
        ticket_rating: ticketReivew,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/review`;
    return await apiHandler(apiPath, payload);
};

interface MessageObject {
    ticket_message: string;
    attachment: string;
}
export const addCommentApi = async (selectedTicketId: number, messageObject: MessageObject) => {
    const payload = {
        ticket_id: selectedTicketId,
        ...messageObject,
    };
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/comment`;
    return await apiHandler(apiPath, payload);
};

export const confirmPendingApi = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/pending`;
    return await apiHandler(apiPath, payload);
};
export const confirmPendingApiForCs = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/pending`;
    return await apiHandler(apiPath, payload);
};

export const updateAssignMemberApi = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/assign`;
    return await apiHandler(apiPath, payload);
};

export const uploadAttachmentApi = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/uploadDocs`;
    return await apiHandlerWithFileNew(apiPath, payload);
};

// new ticket api
export const sendNewTicketData = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/add`;
    return await apiHandler(apiPath, payload);
};

// unactionable by itl
export const confirmUnactionbleItlApi = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/unactionable-by-itl`;
    return await apiHandler(apiPath, payload);
};

// close & reopen ticket
export const confirmCloseReopenApi = async (payload: any) => {
    const apiPath = `${config.baseUrlApiNew}api/v1/support-ticket/edit/clone`;
    return await apiHandler(apiPath, payload);
};
