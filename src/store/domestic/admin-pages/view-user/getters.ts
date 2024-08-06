import { ADMINVIEWUSER } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable data payload
    [ADMINVIEWUSER.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        return allFilterData;
    },
    // For datatable filter li
    [ADMINVIEWUSER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [ADMINVIEWUSER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'user_created_date':
    //                 case 'user_last_login_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'user_type':
    //                 case 'user_enabled':
    //                 case 'delivery_type':
    //                 case 'user_status':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'total_user_credit_amount':
    //                 case 'total_user_wallet_amount':
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
    [ADMINVIEWUSER.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        allFilterData['processType'] = state.exportPayload;

        return allFilterData;
    },
    // For datatable start page count
    [ADMINVIEWUSER.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [ADMINVIEWUSER.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [ADMINVIEWUSER.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [ADMINVIEWUSER.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [ADMINVIEWUSER.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [ADMINVIEWUSER.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [ADMINVIEWUSER.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        console.log(state.DefaultColumn, 'state.DefaultColumn');
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [ADMINVIEWUSER.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //  get all filter data
    [ADMINVIEWUSER.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [ADMINVIEWUSER.GETTERS.GETDTDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [ADMINVIEWUSER.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [ADMINVIEWUSER.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [ADMINVIEWUSER.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [ADMINVIEWUSER.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get view saved filter data
    [ADMINVIEWUSER.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [ADMINVIEWUSER.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [ADMINVIEWUSER.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [ADMINVIEWUSER.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
});
export default createGetters;
