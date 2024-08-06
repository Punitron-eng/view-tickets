import { CREDITWALLET } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [CREDITWALLET.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    // For datatable data payload
    [CREDITWALLET.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['store'] = state.storeId;
        allFilterData['items'] = state.allFilterData.items == '>5' ? '6' : state.allFilterData.items;

        return allFilterData;
    },
    // For datatable filter li
    [CREDITWALLET.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [CREDITWALLET.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast' && key != 'search') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'debit':
    //                 case 'credit':
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
    [CREDITWALLET.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },
    // For datatable start page count
    [CREDITWALLET.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [CREDITWALLET.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [CREDITWALLET.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [CREDITWALLET.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [CREDITWALLET.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [CREDITWALLET.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [CREDITWALLET.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [CREDITWALLET.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    // for dttable get saved filter
    //  get all filter data
    [CREDITWALLET.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [CREDITWALLET.GETTERS.GETDTDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [CREDITWALLET.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [CREDITWALLET.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [CREDITWALLET.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [CREDITWALLET.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get view saved filter data
    [CREDITWALLET.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [CREDITWALLET.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [CREDITWALLET.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [CREDITWALLET.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
});
export default createGetters;
