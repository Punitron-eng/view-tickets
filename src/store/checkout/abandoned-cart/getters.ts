import { ABANDONEDCART } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [ABANDONEDCART.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [ABANDONEDCART.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        // allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;
        allFilterData['storeId'] = state.storeId;

        return allFilterData;
    },

    // For datatable filter li
    [ABANDONEDCART.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [ABANDONEDCART.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
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
    //                 case 'checkout_stage':
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
    [ABANDONEDCART.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        
        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [ABANDONEDCART.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [ABANDONEDCART.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [ABANDONEDCART.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [ABANDONEDCART.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [ABANDONEDCART.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [ABANDONEDCART.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [ABANDONEDCART.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [ABANDONEDCART.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    //
    // [ABANDONEDCART.GETTERS.GETSAVEDFILTERLIST](state: any) {
    //     const vendorId = state.allFilterData.vendor_name.id;
    //     const vendorValue = state.allFilterData.vendor_name.value;
    //     const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
    //     const allFilterData = {
    //         storeId: state.storeId,
    //         order_id: state.allFilterData.order_id,
    //         order_customer_details: state.allFilterData.order_customer_details,
    //         order_date: state.allFilterData.order_date.value,
    //         orderDateLable: state.allFilterData.order_date.id,
    //         payment: state.allFilterData.payment.id,
    //         order_amount: state.allFilterData.order_amount,
    //         paginatorStart: state.allFilterData.paginatorStart,
    //         search: state.allFilterData.search_cart_id,
    //         vendor_name: tempVendorData,
    //         // order_product_quantity: state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity,
    //     };
    //     return allFilterData;
    // },
    [ABANDONEDCART.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [ABANDONEDCART.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [ABANDONEDCART.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [ABANDONEDCART.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [ABANDONEDCART.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [ABANDONEDCART.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [ABANDONEDCART.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [ABANDONEDCART.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [ABANDONEDCART.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [ABANDONEDCART.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [ABANDONEDCART.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [ABANDONEDCART.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [ABANDONEDCART.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [ABANDONEDCART.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [ABANDONEDCART.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [ABANDONEDCART.GETTERS.SENDABANDONEDMODALDATA](state: any) {
        return state.abandonedModalData;
    },
    [ABANDONEDCART.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    // For datatable data count
    [ABANDONEDCART.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
