import { BILLINGINTL } from './constants';
import { getFilterMappedPayload, getFilterMappedValues } from '../../commonStoreFuncs';
const createGetters = () => ({
    // For datatable action modals
    [BILLINGINTL.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [BILLINGINTL.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        // Add additional properties not present in state.allFilterData
        allFilterData['page_count'] = state.page_count;

        return allFilterData;
    },

    // For datatable filter li
    [BILLINGINTL.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },
    // [BILLINGINTL.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             switch (key) {
    //                 case 'remittance_date':
    //                 case 'order_date':
    //                 case 'bad_debt_created_date':
    //                 case 'cancel_request_date':
    //                 case 'cn_date':
    //                 case 'invoice_date':
    //                 case 'billing_invoice_due_date':
    //                 case 'wallet_transactions_date':
    //                     filteredValue = value.label === undefined ? '' : value.label;
    //                     break;
    //                 case 'vendor_name':
    //                 case 'remittance_plan':
    //                 case 'tracking_status':
    //                 case 'billing_invoice_status':
    //                 case 'awb_no_logistics':
    //                 case 'invoice_type':
    //                 case 'order_type':
    //                 case 'bad_debt_type':
    //                 case 'cn_status':
    //                 case 'billing_zone':
    //                 case 'cn_type':
    //                 case 'claim_status':
    //                 case 'order_product_quantity':
    //                 case 'remittance_status':
    //                 case 'order_cancel_status':
    //                     if (value.value !== undefined && value.value.length > 0) {
    //                         filteredValue = value.value.join(',');
    //                     }
    //                     break;
    //                 case 'cod_generated':
    //                 case 'bill_adjusted':
    //                 case 'refund_adjusted':
    //                 case 'wallet_transfer':
    //                 case 'cod_remitted':
    //                 case 'early_cod':
    //                 case 'billing_weight':
    //                 case 'total_freight_charge':
    //                 case 'wallet_debit':
    //                 case 'wallet_credit':
    //                 case 'wallet_balance':
    //                 case 'amount':
    //                 case 'billing_cod_adjusted':
    //                 case 'billing_credit_note_amount':
    //                 case 'order_amount':
    //                 case 'billing_tds':
    //                 case 'billing_wallet_adjusted':
    //                 case 'billing_amount_received':
    //                 case 'billing_paid_amount':
    //                 case 'billing_invoice_amount':
    //                 case 'billing_round_off':
    //                 case 'billing_outstanding':
    //                 case 'cn_generated':
    //                 case 'cn_available':
    //                 case 'bad_debt_amount':
    //                 case 'cn_amount':
    //                 case 'claim_received':
    //                 case 'advance_hold':
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
    [BILLINGINTL.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
        const allFilterData = getFilterMappedPayload(state);

        allFilterData['store'] = state.storeId;
        allFilterData['processType'] = state.exportPayload;
        allFilterData['selectedCheckbox'] = state.selectedCheckbox;

        return allFilterData;
    },

    // For datatable start page count
    [BILLINGINTL.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [BILLINGINTL.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [BILLINGINTL.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [BILLINGINTL.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [BILLINGINTL.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [BILLINGINTL.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [BILLINGINTL.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [BILLINGINTL.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },

    [BILLINGINTL.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [BILLINGINTL.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [BILLINGINTL.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [BILLINGINTL.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [BILLINGINTL.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [BILLINGINTL.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [BILLINGINTL.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [BILLINGINTL.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [BILLINGINTL.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [BILLINGINTL.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [BILLINGINTL.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [BILLINGINTL.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [BILLINGINTL.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [BILLINGINTL.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [BILLINGINTL.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [BILLINGINTL.GETTERS.SENDABANDONEDMODALDATA](state: any) {
        return state.abandonedModalData;
    },
    [BILLINGINTL.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [BILLINGINTL.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },
    [BILLINGINTL.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },
});
export default createGetters;
