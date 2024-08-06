import { ORDERMANAGEMENTREQ } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable data payload
    [ORDERMANAGEMENTREQ.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        return allFilterData;
    },
    // For datatable filter li
    [ORDERMANAGEMENTREQ.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [ORDERMANAGEMENTREQ.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_last_update_date':
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
    [ORDERMANAGEMENTREQ.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        allFilterData['processType'] = state.exportPayload;

        return allFilterData;
    },
    // For datatable start page count
    [ORDERMANAGEMENTREQ.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [ORDERMANAGEMENTREQ.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [ORDERMANAGEMENTREQ.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [ORDERMANAGEMENTREQ.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [ORDERMANAGEMENTREQ.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [ORDERMANAGEMENTREQ.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [ORDERMANAGEMENTREQ.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        console.log(state.DefaultColumn, 'state.DefaultColumn');
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [ORDERMANAGEMENTREQ.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //  get all filter data
    [ORDERMANAGEMENTREQ.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [ORDERMANAGEMENTREQ.GETTERS.GETDTDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [ORDERMANAGEMENTREQ.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [ORDERMANAGEMENTREQ.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [ORDERMANAGEMENTREQ.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [ORDERMANAGEMENTREQ.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get view saved filter data
    [ORDERMANAGEMENTREQ.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [ORDERMANAGEMENTREQ.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [ORDERMANAGEMENTREQ.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [ORDERMANAGEMENTREQ.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [ORDERMANAGEMENTREQ.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },
    [ORDERMANAGEMENTREQ.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },
});
export default createGetters;
