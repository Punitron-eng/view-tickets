import { UPDATECODDETAILS } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable data payload
    [UPDATECODDETAILS.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        return allFilterData;
    },

    // For datatable filter li
    [UPDATECODDETAILS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [UPDATECODDETAILS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'cod_amount_requested_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'old_order_amount':
    //                 case 'revised_order_amount':
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
    [UPDATECODDETAILS.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [UPDATECODDETAILS.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [UPDATECODDETAILS.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [UPDATECODDETAILS.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [UPDATECODDETAILS.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [UPDATECODDETAILS.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [UPDATECODDETAILS.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [UPDATECODDETAILS.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [UPDATECODDETAILS.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    [UPDATECODDETAILS.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [UPDATECODDETAILS.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [UPDATECODDETAILS.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [UPDATECODDETAILS.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [UPDATECODDETAILS.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [UPDATECODDETAILS.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [UPDATECODDETAILS.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [UPDATECODDETAILS.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [UPDATECODDETAILS.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [UPDATECODDETAILS.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // [UPDATECODDETAILS.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // [UPDATECODDETAILS.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },

    // [UPDATECODDETAILS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDSTOREID](state: any) {
    //     return state.storeId;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDSTOREMODALDATA](state: any) {
    //     return state.storeModalData;
    // },
    [UPDATECODDETAILS.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // [UPDATECODDETAILS.GETTERS.SENDRAISEMODALDATA](state: any) {
    //     return state.getRaiseModalData;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDSKELETON](state: any) {
    //     return state.isSkeleton;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDIMAGEUPLOAD](state: any) {
    //     return state.imageUploadData;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
    //     return state.raiseVendorSubmitData;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
    //     return state.editVendorSubmitData;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDREJECTMODALDATA](state: any) {
    //     return state.rejectModalVal;
    // },
    // [UPDATECODDETAILS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.viewDetailsData;
    // },
});
export default createGetters;
