import { NOTIFICATIONBILLING } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [NOTIFICATIONBILLING.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [NOTIFICATIONBILLING.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        // Add additional properties not present in state.allFilterData
        // allFilterData.page_count_billing = state.page_count;

        return allFilterData;
    },

    // For datatable filter li
    [NOTIFICATIONBILLING.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [NOTIFICATIONBILLING.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                 case 'invoice_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'tracking_status':
    //                 case 'awb_no_logistics':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;

    //                 default:
    //                     filteredValue = value;
    //                     break;
    //             }
    //             allFilterData[key] = filteredValue;
    //         }
    //     }
    //     return allFilterData;
    // },
    // For datatable export data
    [NOTIFICATIONBILLING.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = {};

        for (const key in state.allFilterData) {
            if (state.allFilterData.hasOwnProperty(key)) {
                const value = state.allFilterData[key];
                if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
                    allFilterData[key] = value.value;
                    allFilterData[`${key}Label`] = value.id;
                } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
                    allFilterData[key] = value.id;
                } else {
                    allFilterData[key] = value;
                }
            }
        }

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [NOTIFICATIONBILLING.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [NOTIFICATIONBILLING.GETTERS.GETPAGINATORLASTVALUE](state: any) {
        const total = state.reverseData.recordsTotal;
        let last = state.allFilterData.paginatorStart + Number(state.allFilterData.paginatorLast);
        if (last > total) {
            last = total;
        } else {
            last;
        }
        return last;
    },

    // For datatable last page count
    [NOTIFICATIONBILLING.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [NOTIFICATIONBILLING.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [NOTIFICATIONBILLING.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [NOTIFICATIONBILLING.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [NOTIFICATIONBILLING.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [NOTIFICATIONBILLING.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //
    [NOTIFICATIONBILLING.GETTERS.GETSAVEDFILTERLIST](state: any) {
        const vendorId = state.allFilterData.vendor_name.id;
        const vendorValue = state.allFilterData.vendor_name.value;
        const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
        const allFilterData = {
            invoice_id: state.allFilterData.invoice_id,
            order_id: state.allFilterData.order_id,
            awb_no_logistics: state.allFilterData.awb_no_logistics.id,
            order_date: state.allFilterData.order_date.value,
            orderDateLabel: state.allFilterData.order_date.id,
            invoiceDate: state.allFilterData.invoice_date.value,
            invoiceDateLabel: state.allFilterData.invoice_date.id,
            tracking_status: state.allFilterData.tracking_status.id,
            paginatorStart: state.allFilterData.paginatorStart,
            search: state.allFilterData.search,
            vendor_name: tempVendorData,
        };
        return allFilterData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [NOTIFICATIONBILLING.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [NOTIFICATIONBILLING.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [NOTIFICATIONBILLING.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [NOTIFICATIONBILLING.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [NOTIFICATIONBILLING.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [NOTIFICATIONBILLING.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [NOTIFICATIONBILLING.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [NOTIFICATIONBILLING.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [NOTIFICATIONBILLING.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [NOTIFICATIONBILLING.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [NOTIFICATIONBILLING.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [NOTIFICATIONBILLING.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
