import { COUPONS } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [COUPONS.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [COUPONS.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },

    // For datatable filter li
    [COUPONS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [COUPONS.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
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
    [COUPONS.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [COUPONS.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [COUPONS.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [COUPONS.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [COUPONS.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [COUPONS.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [COUPONS.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [COUPONS.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [COUPONS.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [COUPONS.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [COUPONS.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [COUPONS.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [COUPONS.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [COUPONS.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [COUPONS.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [COUPONS.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [COUPONS.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [COUPONS.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [COUPONS.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // [COUPONS.GETTERS.GETWIDGETTITLE](state: any) {
    //     return state.widgetTitleData;
    // },
    // [COUPONS.GETTERS.GETWIDGETVALUES](state: any) {
    //     return state.widgetValueData;
    // },

    // [COUPONS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    // [COUPONS.GETTERS.SENDSTOREID](state: any) {
    //     return state.storeId;
    // },
    // [COUPONS.GETTERS.SENDSTOREMODALDATA](state: any) {
    //     return state.storeModalData;
    // },
    [COUPONS.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // [COUPONS.GETTERS.SENDRAISEMODALDATA](state: any) {
    //     return state.getRaiseModalData;
    // },
    // [COUPONS.GETTERS.SENDSKELETON](state: any) {
    //     return state.isSkeleton;
    // },
    // [COUPONS.GETTERS.SENDIMAGEUPLOAD](state: any) {
    //     return state.imageUploadData;
    // },
    // [COUPONS.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
    //     return state.raiseVendorSubmitData;
    // },
    // [COUPONS.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
    //     return state.editVendorSubmitData;
    // },
    // [COUPONS.GETTERS.SENDREJECTMODALDATA](state: any) {
    //     return state.rejectModalVal;
    // },
    // [COUPONS.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.viewDetailsData;
    // },
});
export default createGetters;
