import { WEIGHTDISCREPANCY } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [WEIGHTDISCREPANCY.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [WEIGHTDISCREPANCY.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        // allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },

    // For datatable filter li
    [WEIGHTDISCREPANCY.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [WEIGHTDISCREPANCY.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'weight_discrepancy_date':
    //                 case 'weight_dispute_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'weight_discrepancy_status':
    //                 case 'awb_no_logistics':
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
    [WEIGHTDISCREPANCY.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const getMountInfo = state.allFilterData.weight_discrepancy_date.label;
        const isMountedLoad = getMountInfo != '' ? 0 : 1;

        const allFilterData = getFilterMappedPayload(state);

        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;
        allFilterData['isMountedLoad'] = isMountedLoad;

        return allFilterData;
    },

    // For datatable start page count
    [WEIGHTDISCREPANCY.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [WEIGHTDISCREPANCY.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [WEIGHTDISCREPANCY.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [WEIGHTDISCREPANCY.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [WEIGHTDISCREPANCY.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [WEIGHTDISCREPANCY.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [WEIGHTDISCREPANCY.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [WEIGHTDISCREPANCY.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //
    // [WEIGHTDISCREPANCY.GETTERS.GETSAVEDFILTERLIST](state: any) {
    //     const vendorId = state.allFilterData.vendor_name.id;
    //     const vendorValue = state.allFilterData.vendor_name.value;
    //     const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
    //     const allFilterData = {
    //         order_id: state.allFilterData.order_id,
    //         customer: state.allFilterData.customer,
    //         order_date: state.allFilterData.order_date.value,
    //         orderDateLable: state.allFilterData.order_date.id,
    //         payment: state.allFilterData.payment.id,
    //         order_amount: state.allFilterData.order_amount,
    //         paginatorStart: state.allFilterData.paginatorStart,
    //         search: state.allFilterData.search,
    //         vendor_name: tempVendorData,
    //         order_product_quantity: state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity,
    //     };
    //     return allFilterData;
    // },
    [WEIGHTDISCREPANCY.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    // [WEIGHTDISCREPANCY.GETTERS.SENDSTOREDETAILS](state: any) {
    //     return state.storeDropdown;
    // },
    [WEIGHTDISCREPANCY.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDRAISEMODALDATA](state: any) {
        return state.getRaiseModalData;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDSKELETON](state: any) {
        return state.isSkeleton;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDIMAGEUPLOAD](state: any) {
        return state.imageUploadData;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDRISEDISCREPANCYDATA](state: any) {
        return state.raiseVendorSubmitData;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDEDITDISCREPANCYDATA](state: any) {
        return state.editVendorSubmitData;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDREJECTMODALDATA](state: any) {
        return state.rejectModalVal;
    },
    [WEIGHTDISCREPANCY.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.viewDetailsData;
    },
    [WEIGHTDISCREPANCY.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
