import { CANCELRTOPODREQ } from './constants';
import { getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [CANCELRTOPODREQ.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    // For datatable data payload
    [CANCELRTOPODREQ.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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

        // Add additional properties not present in state.allFilterData
        allFilterData['items'] = state.allFilterData.items == '>5' ? '6' : state.allFilterData.items;

        return allFilterData;
    },
    // For datatable filter li
    [CANCELRTOPODREQ.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [CANCELRTOPODREQ.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                 case 'order_cancel_request_date':
    //                 case 'order_rto_request_date':
    //                 case 'order_pod_request_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'order_type':
    //                 case 'order_cancel_request_status':
    //                 case 'order_rto_request_status':
    //                 case 'order_pod_request_status':
    //                 case 'awb_no_logistics':
    //                 case 'vendor_name':
    //                 case 'order_cancel_status':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'order_amount':
    //                     const min = value.min;
    //                     const max = value.max;
    //                     if (min !== '' && (min !== 0 || max !== 0)) {
    //                         filteredValue = value;
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
    [CANCELRTOPODREQ.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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
    [CANCELRTOPODREQ.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [CANCELRTOPODREQ.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [CANCELRTOPODREQ.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [CANCELRTOPODREQ.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [CANCELRTOPODREQ.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [CANCELRTOPODREQ.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [CANCELRTOPODREQ.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [CANCELRTOPODREQ.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    // for dttable get saved filter
    // [CANCELRTOPODREQ.GETTERS.GETSAVEDFILTERLIST](state: any) {
    //     const vendorId = state.allFilterData.vendor_name.id;
    //     const vendorValue = state.allFilterData.vendor_name.value;
    //     const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
    //     const allFilterData = {
    //         order_id: state.allFilterData.order_id,
    //         customer: state.allFilterData.customer,
    //         ndr_date: state.allFilterData.order_date.value,
    //         orderDateLable: state.allFilterData.order_date.id,
    //         payment: state.allFilterData.payment.id,
    //         amount: state.allFilterData.amount,
    //         paginatorStart: state.allFilterData.paginatorStart,
    //         search: state.allFilterData.search,
    //         vendor_name: tempVendorData,
    //         items: state.allFilterData.items == '>5' ? '6' : state.allFilterData.items,
    //     };
    //     return allFilterData;
    // },
    //  get all filter data
    [CANCELRTOPODREQ.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [CANCELRTOPODREQ.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [CANCELRTOPODREQ.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [CANCELRTOPODREQ.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [CANCELRTOPODREQ.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [CANCELRTOPODREQ.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get product details
    [CANCELRTOPODREQ.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    // get view saved filter data
    [CANCELRTOPODREQ.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [CANCELRTOPODREQ.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [CANCELRTOPODREQ.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // get widget title
    // [CANCELRTOPODREQ.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // get widget value
    // [CANCELRTOPODREQ.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },
    [CANCELRTOPODREQ.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [CANCELRTOPODREQ.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [CANCELRTOPODREQ.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [CANCELRTOPODREQ.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
});
export default createGetters;
