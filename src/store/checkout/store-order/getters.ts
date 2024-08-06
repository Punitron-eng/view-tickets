import { STOREORDER } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [STOREORDER.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    // For datatable data payload
    [STOREORDER.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;
        allFilterData['store'] = state.storeId;
        // allFilterData['order_product_quantity'] = state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity;

        return allFilterData;
    },
    // For datatable filter li
    [STOREORDER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [STOREORDER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'order_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'order_type':
    //                 case 'vendor_name':
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
    [STOREORDER.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        
        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },
    // For datatable start page count
    [STOREORDER.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [STOREORDER.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [STOREORDER.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [STOREORDER.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [STOREORDER.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [STOREORDER.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [STOREORDER.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [STOREORDER.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    // for dttable get saved filter
    [STOREORDER.GETTERS.GETSAVEDFILTERLIST](state: any) {
        const vendorId = state.allFilterData.vendor_name.id;
        const vendorValue = state.allFilterData.vendor_name.value;
        const tempVendorData = vendorId.map((id: any, index: any) => `${id}:${vendorValue[index]}`);
        const allFilterData = {
            storeId: state.storeId,
            order_id: state.allFilterData.order_id,
            order_customer_details: state.allFilterData.order_customer_details,
            order_date: state.allFilterData.order_date.value,
            orderDateLable: state.allFilterData.order_date.id,
            order_type: state.allFilterData.order_type.id,
            order_amount: state.allFilterData.order_amount,
            paginatorStart: state.allFilterData.paginatorStart,
            search: state.allFilterData.search,
            vendor_name: tempVendorData,
            // order_product_quantity: state.allFilterData.order_product_quantity == '>5' ? '6' : state.allFilterData.order_product_quantity,
        };
        return allFilterData;
    },
    //  get all filter data
    [STOREORDER.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [STOREORDER.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [STOREORDER.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [STOREORDER.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [STOREORDER.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [STOREORDER.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get product details
    [STOREORDER.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    // get view saved filter data
    [STOREORDER.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    // get api response
    [STOREORDER.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [STOREORDER.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // get widget title
    [STOREORDER.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    // get widget value
    [STOREORDER.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },
    [STOREORDER.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [STOREORDER.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [STOREORDER.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [STOREORDER.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    // For datatable data count
    [STOREORDER.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;
