import { CPVIEWUSER } from './constants';
import { getFilterMappedValues, getFilterMappedPayload } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable data payload
    [CPVIEWUSER.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        return getFilterMappedPayload(state);
    },
    // For datatable filter li
    [CPVIEWUSER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // For datatable export data
    [CPVIEWUSER.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        return getFilterMappedPayload(state);
    },
    // For datatable start page count
    [CPVIEWUSER.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [CPVIEWUSER.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [CPVIEWUSER.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [CPVIEWUSER.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [CPVIEWUSER.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [CPVIEWUSER.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [CPVIEWUSER.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [CPVIEWUSER.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //  get all filter data
    [CPVIEWUSER.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [CPVIEWUSER.GETTERS.GETDTDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [CPVIEWUSER.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [CPVIEWUSER.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [CPVIEWUSER.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [CPVIEWUSER.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },
    // get open modal state
    [CPVIEWUSER.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get view saved filter data
    [CPVIEWUSER.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [CPVIEWUSER.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [CPVIEWUSER.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [CPVIEWUSER.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // For datatable data count
    [CPVIEWUSER.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
