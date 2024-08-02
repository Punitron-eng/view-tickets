import { PINCODE } from './constants';
import { getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [PINCODE.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [PINCODE.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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
        allFilterData['items'] = state.allFilterData.items == '>5' ? '6' : state.allFilterData.items;
        allFilterData['storeId'] = state.storeId;

        return allFilterData;
    },

    // For datatable filter li
    [PINCODE.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [PINCODE.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 // case 'order_date':
    //                 //     filteredValue = value.label === undefined ? '' : value.label;
    //                 //     break;
    //                 case 'vendor_name':
    //                 case 'awb_no_logistics':
    //                 case 'pincode_pickup_available':
    //                 case 'pincode_cod_available':
    //                 case 'pincode_prepaid_available':
    //                 case 'pincode_status':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 // case 'order_amount':
    //                 //     const min = value.min;
    //                 //     const max = value.max;
    //                 //     if (min !== '' && (min !== 0 || max !== 0)) {
    //                 //         filteredValue = value;
    //                 //     }
    //                 //     break;
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
    [PINCODE.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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
    [PINCODE.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [PINCODE.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [PINCODE.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [PINCODE.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [PINCODE.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [PINCODE.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [PINCODE.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [PINCODE.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [PINCODE.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [PINCODE.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [PINCODE.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [PINCODE.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [PINCODE.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [PINCODE.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [PINCODE.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [PINCODE.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [PINCODE.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [PINCODE.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [PINCODE.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [PINCODE.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [PINCODE.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [PINCODE.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [PINCODE.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [PINCODE.GETTERS.SENDABANDONEDMODALDATA](state: any) {
        return state.abandonedModalData;
    },
    [PINCODE.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
});
export default createGetters;
