import { PUSHPULLSCANLIST } from './constants';
import { getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [PUSHPULLSCANLIST.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [PUSHPULLSCANLIST.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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
    [PUSHPULLSCANLIST.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [PUSHPULLSCANLIST.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};

    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'vendor_name':
    //                 case 'pincode_status':
    //                 case 'awb_no_logistics':
    //                 case 'tracking_status':
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
    //     console.log(allFilterData, state.allFilterData);

    //     return allFilterData;
    // },
    // For datatable export data
    [PUSHPULLSCANLIST.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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
    [PUSHPULLSCANLIST.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [PUSHPULLSCANLIST.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [PUSHPULLSCANLIST.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [PUSHPULLSCANLIST.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [PUSHPULLSCANLIST.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [PUSHPULLSCANLIST.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [PUSHPULLSCANLIST.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [PUSHPULLSCANLIST.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [PUSHPULLSCANLIST.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [PUSHPULLSCANLIST.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [PUSHPULLSCANLIST.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [PUSHPULLSCANLIST.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [PUSHPULLSCANLIST.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [PUSHPULLSCANLIST.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [PUSHPULLSCANLIST.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [PUSHPULLSCANLIST.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [PUSHPULLSCANLIST.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [PUSHPULLSCANLIST.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // [PUSHPULLSCANLIST.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // [PUSHPULLSCANLIST.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },

    [PUSHPULLSCANLIST.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [PUSHPULLSCANLIST.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [PUSHPULLSCANLIST.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [PUSHPULLSCANLIST.GETTERS.SENDABANDONEDMODALDATA](state: any) {
        return state.abandonedModalData;
    },
    [PUSHPULLSCANLIST.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
});
export default createGetters;
