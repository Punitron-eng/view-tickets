import { BGPROCESS } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [BGPROCESS.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [BGPROCESS.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },

    // For datatable filter li
    [BGPROCESS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [BGPROCESS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'sub_admin_name':
    //                 case 'awb_no_logistics':
    //                 case 'order_type':
    //                 case 'calling_status':
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
    [BGPROCESS.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [BGPROCESS.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [BGPROCESS.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [BGPROCESS.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [BGPROCESS.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [BGPROCESS.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [BGPROCESS.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [BGPROCESS.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [BGPROCESS.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [BGPROCESS.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [BGPROCESS.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [BGPROCESS.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [BGPROCESS.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [BGPROCESS.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [BGPROCESS.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [BGPROCESS.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [BGPROCESS.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [BGPROCESS.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [BGPROCESS.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // [BGPROCESS.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // [BGPROCESS.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },

    // [BGPROCESS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    // [BGPROCESS.GETTERS.SENDSTOREID](state: any) {
    //     return state.storeId;
    // },
    // [BGPROCESS.GETTERS.SENDSTOREMODALDATA](state: any) {
    //     return state.storeModalData;
    // },
    [BGPROCESS.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // [BGPROCESS.GETTERS.SENDRAISEMODALDATA](state: any) {
    //     return state.getRaiseModalData;
    // },
    // [BGPROCESS.GETTERS.SENDSKELETON](state: any) {
    //     return state.isSkeleton;
    // },
    // [BGPROCESS.GETTERS.SENDIMAGEUPLOAD](state: any) {
    //     return state.imageUploadData;
    // },
    // [BGPROCESS.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
    //     return state.raiseVendorSubmitData;
    // },
    // [BGPROCESS.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
    //     return state.editVendorSubmitData;
    // },
    // [BGPROCESS.GETTERS.SENDREJECTMODALDATA](state: any) {
    //     return state.rejectModalVal;
    // },
    // [BGPROCESS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.viewDetailsData;
    // },
});
export default createGetters;
