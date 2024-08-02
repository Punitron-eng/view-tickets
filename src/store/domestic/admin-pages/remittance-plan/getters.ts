import { getFilterMappedValues } from '../../../commonStoreFuncs';
import { REMITTANCEPLAN } from './constants';
const createGetters = () => ({
    /////////////////// Common datatable Getters start //////////////////////////
    //  get all dt Table data
    [REMITTANCEPLAN.GETTERS.GETDTDATA](state: any) {
        return state.reverseData;
    },

    // For datatable data payload
    [REMITTANCEPLAN.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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

        return allFilterData;
    },

    // For datatable filter li
    [REMITTANCEPLAN.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [REMITTANCEPLAN.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast' && key != 'search') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'remittance_plan_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                 break;
    //                 case 'vendor_name':
    //                 case 'remittance_plan_name':
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

    // For datatable start page count
    [REMITTANCEPLAN.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [REMITTANCEPLAN.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [REMITTANCEPLAN.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [REMITTANCEPLAN.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [REMITTANCEPLAN.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [REMITTANCEPLAN.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [REMITTANCEPLAN.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [REMITTANCEPLAN.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    [REMITTANCEPLAN.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [REMITTANCEPLAN.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [REMITTANCEPLAN.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get open modal state
    [REMITTANCEPLAN.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [REMITTANCEPLAN.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [REMITTANCEPLAN.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [REMITTANCEPLAN.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [REMITTANCEPLAN.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },

    /////////////////// Common datatable Getters end //////////////////////////
});
export default createGetters;
