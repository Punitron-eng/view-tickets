import { VIEWORDERINTL } from './constants';
import { getFilterMappedValues } from '../../commonStoreFuncs';
import { get } from '@vueuse/core';
const createGetters = () => ({
    // For datatable action modals
    [VIEWORDERINTL.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    // For datatable data payload
    [VIEWORDERINTL.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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
        allFilterData['page_count'] = state.page_count;
        allFilterData['store'] = state.storeId;
        allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },
    // For datatable filter li
    [VIEWORDERINTL.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        console.log(getFilterMappedValues(state),'inside the view order store action');
        return getFilterMappedValues(state);
    },
    // [VIEWORDERINTL.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                 case 'return_delivered_date':
    //                 case 'return_initiate_date':
    //                 case 'order_delivered_date':
    //                 case 'order_last_update_date':
    //                 case 'order_edd':
    //                 case 'order_pickup_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'risk':
    //                 case 'order_type':
    //                 case 'vendor_name':
    //                 case 'awb_no_logistics':
    //                 case 'pickup_cutoff':
    //                 case 'no_of_attempts':
    //                 case 'order_fulfillment':
    //                 case 'buyer_intent':
    //                 case 'tracking_status_intl':
    //                 case 'latest_courier_remark':
    //                 case 'order_duties':
    //                 case 'order_weight':
    //                 case 'tracking_otp_cancelled':
    //                 case 'order_country':
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
    [VIEWORDERINTL.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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
        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },
    // For datatable start page count
    [VIEWORDERINTL.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [VIEWORDERINTL.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [VIEWORDERINTL.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [VIEWORDERINTL.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [VIEWORDERINTL.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [VIEWORDERINTL.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [VIEWORDERINTL.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [VIEWORDERINTL.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    //  get all filter data
    [VIEWORDERINTL.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [VIEWORDERINTL.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [VIEWORDERINTL.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [VIEWORDERINTL.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [VIEWORDERINTL.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [VIEWORDERINTL.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get product details
    [VIEWORDERINTL.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    // get view saved filter data
    [VIEWORDERINTL.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [VIEWORDERINTL.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [VIEWORDERINTL.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // get widget title
    // [VIEWORDERINTL.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // get widget value
    // [VIEWORDERINTL.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },
    [VIEWORDERINTL.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [VIEWORDERINTL.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [VIEWORDERINTL.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [VIEWORDERINTL.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [VIEWORDERINTL.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },
});
export default createGetters;
