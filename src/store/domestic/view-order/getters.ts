import { VIEWORDER } from './constants';
import { getFilterMappedValues, getFilterMappedPayload } from '../../commonStoreFuncs.ts';
const createGetters = () => ({
    // For datatable action modals
    [VIEWORDER.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },
    // For datatable data payload
    [VIEWORDER.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        // Add additional properties not present in state.allFilterData
        allFilterData['store'] = state.storeId;
        return allFilterData;
    },
    // For datatable filter li
    [VIEWORDER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [VIEWORDER.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     let groupedValues = {};
    //     console.log(state.allFilterData, 'state.allFilterData');
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue: any = '';
    //             switch (key) {
    //                 case 'order_buyer_intent':
    //                     const newData = {};

    //                     for (const key in value) {
    //                         if (value.hasOwnProperty(key) && value[key].value.length > 0) {
    //                             newData[key] = value[key].value.join(',');
    //                         }
    //                     }
    //                     filteredValue = Object.keys(newData).length === 0 ? '' : newData;
    //                     break;
    //                 case 'order_date':
    //                 case 'order_return_delivered_date':
    //                 case 'order_return_initiate_date':
    //                 case 'delivered_date':
    //                 case 'order_last_update_date':
    //                 case 'order_delivered_date':
    //                 case 'order_pickup_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'order_risk':
    //                 case 'order_product_quantity':
    //                 case 'order_type':
    //                 case 'vendor_name':
    //                 case 'awb_no_logistics':
    //                 case 'pickup_cutoff':
    //                 case 'no_of_attempts':
    //                 case 'order_edd':
    //                 case 'order_fulfillment':
    //                 case 'latest_courier_remark':
    //                 case 'order_weight':
    //                 case 'tracking_otp_cancelled':
    //                 case 'order_whatsapp_status':
    //                 case 'order_state':
    //                 case 'is_oda':
    //                 case 'tracking_status':
    //                 case 'order_source':
    //                 case 'order_incorrect_address_status':
    //                 case 'order_ndr_count':
    //                 case 'order_ageing_days':
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
    //     Object.entries(groupedValues).map(([index, values]) => {
    //         allFilterData[index] = '';
    //         state.allFilterData[index] = '';
    //         allFilterData[index] = values.join(',');
    //         state.allFilterData[index] = values.join(',');
    //     });
    //     return allFilterData;
    // },
    // For datatable export data
    [VIEWORDER.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);
        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;
        return allFilterData;
    },
    // For datatable start page count
    [VIEWORDER.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },
    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [VIEWORDER.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [VIEWORDER.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },
    // For datatable vendor data array
    [VIEWORDER.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },
    // For datatable selected vendor data
    [VIEWORDER.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },
    // For datatable Vendor status
    [VIEWORDER.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },
    // For datatable columns
    [VIEWORDER.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },
    // For datatable column payload store at mounted
    [VIEWORDER.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    //  get all filter data
    [VIEWORDER.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    //  get all dt Table data
    [VIEWORDER.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    //  get all filter response
    [VIEWORDER.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    // get save filter response
    [VIEWORDER.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    // get export status
    [VIEWORDER.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    // get open modal state
    [VIEWORDER.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    // get product details
    [VIEWORDER.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    // get view saved filter data
    [VIEWORDER.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        console.log('state.viewSaveFilteredData', state.viewSaveFilteredData);
        return state.viewSaveFilteredData;
    },
    // get api response
    [VIEWORDER.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [VIEWORDER.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    // get widget title
    [VIEWORDER.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    // get widget value
    [VIEWORDER.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },
    [VIEWORDER.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [VIEWORDER.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [VIEWORDER.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [VIEWORDER.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [VIEWORDER.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },
    // For datatable data count
    [VIEWORDER.GETTERS.GETDATACOUNT](state: any) {
        return state.count;
    },
});
export default createGetters;

// const tempData = {
//     array1: { id: [1, 2, 3], value: ['a', 'b', 'c'] },
//     array2: { id: [4, 5, 6], value: ['d', 'e', 'f'] },
// };
