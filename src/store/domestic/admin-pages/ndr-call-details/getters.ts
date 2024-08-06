import { NDRCALLDETAILS } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [NDRCALLDETAILS.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [NDRCALLDETAILS.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },

    // For datatable filter li
    [NDRCALLDETAILS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [NDRCALLDETAILS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
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
    [NDRCALLDETAILS.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [NDRCALLDETAILS.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [NDRCALLDETAILS.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [NDRCALLDETAILS.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [NDRCALLDETAILS.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [NDRCALLDETAILS.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [NDRCALLDETAILS.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [NDRCALLDETAILS.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [NDRCALLDETAILS.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [NDRCALLDETAILS.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [NDRCALLDETAILS.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [NDRCALLDETAILS.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [NDRCALLDETAILS.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [NDRCALLDETAILS.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [NDRCALLDETAILS.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [NDRCALLDETAILS.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [NDRCALLDETAILS.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [NDRCALLDETAILS.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [NDRCALLDETAILS.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // [NDRCALLDETAILS.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // [NDRCALLDETAILS.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },

    // [NDRCALLDETAILS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDSTOREID](state: any) {
    //     return state.storeId;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDSTOREMODALDATA](state: any) {
    //     return state.storeModalData;
    // },
    [NDRCALLDETAILS.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // [NDRCALLDETAILS.GETTERS.SENDRAISEMODALDATA](state: any) {
    //     return state.getRaiseModalData;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDSKELETON](state: any) {
    //     return state.isSkeleton;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDIMAGEUPLOAD](state: any) {
    //     return state.imageUploadData;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
    //     return state.raiseVendorSubmitData;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
    //     return state.editVendorSubmitData;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDREJECTMODALDATA](state: any) {
    //     return state.rejectModalVal;
    // },
    // [NDRCALLDETAILS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.viewDetailsData;
    // },
});
export default createGetters;
