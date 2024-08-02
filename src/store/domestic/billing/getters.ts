import { BILLING } from './constants';
import { getFilterMappedValues } from '../../commonStoreFuncs.ts';
const createGetters = () => ({
    // For datatable action modals
    [BILLING.GETTERS.GETDTMODAL](state: any) {
        const dtModal = {
            ViewDetailsModal: state.dtModal.ViewDetailsModal,
            SelectCourierModal: state.dtModal.SelectCourierModal,
            VendorModal: state.dtModal.VendorModal,
            VendorModalDatatable: state.dtModal.VendorModalDatatable,
        };
        return dtModal;
    },

    // For datatable data payload
    [BILLING.GETTERS.GETMAPPEDFILTERPAYLOAD](state: any) {
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
    // [BILLING.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             console.log('value', value);
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

    // [BILLING.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
    //     const allFilterData = {};
    //     for (const key in state.allFilterData) {
    //         if (key != 'paginatorStart' && key != 'paginatorLast') {
    //             const value = state.allFilterData[key];
    //             let filteredValue = '';
    //             if (typeof value === 'object' && 'label' in value) {
    //                 filteredValue = value.label === undefined ? '' : value.label;
    //             } else if (typeof value === 'object' && 'id' in value) {
    //                 if (value.value !== undefined && value.value.length > 0) {
    //                     filteredValue = value.value.join(',');
    //                 }
    //             } else if (typeof value === 'object' && 'min' in value) {
    //                 const min = value.min;
    //                 const max = value.max;
    //                 if (min !== '' && max !== '' && (min !== 0 || max !== 0)) {
    //                     filteredValue = value;
    //                 } else {
    //                     filteredValue = '';
    //                 }
    //             } else {
    //                 filteredValue = value;
    //             }
    //             allFilterData[key] = filteredValue;
    //         }
    //     }
    //     return allFilterData;
    //
    // },
    [BILLING.GETTERS.GETMAPPEDFILTERVALUE](state: any) {
        return getFilterMappedValues(state);
    },

    // For datatable export data
    [BILLING.GETTERS.GETEXPORTVALUEPAYLOAD](state: any) {
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
    [BILLING.GETTERS.GETPAGINATORSTARTVALUE](state: any) {
        return state.allFilterData.paginatorStart;
    },

    // For datatable pagination last count page count   // 0 to 20{GETPAGINATORLASTVALUE} of 50
    [BILLING.GETTERS.GETPAGINATORLASTVALUE](state: any) {
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
    [BILLING.GETTERS.GETPAGINATORROW](state: any) {
        return state.allFilterData.paginatorLast;
    },

    // For datatable vendor data array
    [BILLING.GETTERS.GETVENDORMODALPAYLOAD](state: any) {
        return state.vendorData;
    },

    // For datatable selected vendor data
    [BILLING.GETTERS.GETVENDORVALUES](state: any) {
        return state.allFilterData.vendor_name;
    },

    // For datatable Vendor status
    [BILLING.GETTERS.GETVENDORSTATUS](state: any) {
        return state.vendorDataStatus;
    },

    // For datatable columns
    [BILLING.GETTERS.GETUPDATEDCOLUMNS](state: any) {
        return state.DefaultColumn;
    },

    // For datatable column payload store at mounted
    [BILLING.GETTERS.GETUPDATEDSIZEPAYLOAD](state: any) {
        return state.dataTableSizePayload;
    },
    [BILLING.GETTERS.GETALLFILTERDATA](state: any) {
        return state.allFilterData;
    },
    [BILLING.GETTERS.GETBILLINGDATA](state: any) {
        return state.reverseData;
    },
    [BILLING.GETTERS.GETSAVEDDATATABLERESPONSE](state: any) {
        return state.savedDatatableResponse;
    },
    [BILLING.GETTERS.GETSAVEFILTERRESPONSE](state: any) {
        return state.saveFilterResponse;
    },
    [BILLING.GETTERS.GETEXPORTSTATUS](state: any) {
        return state.exportStatus;
    },
    [BILLING.GETTERS.GETOPENMODAL](state: any) {
        return state.openModal;
    },
    [BILLING.GETTERS.SENDPRODUCTDETAILS](state: any) {
        return state.productDetails;
    },
    [BILLING.GETTERS.GETVIEWSAVEDFILTEREDDATA](state: any) {
        return state.viewSaveFilteredData;
    },
    [BILLING.GETTERS.GETRESPONSEMESSAGE](state: any) {
        return state.responseMessage;
    },
    [BILLING.GETTERS.GETEDITEDCOLUMNSTATUS](state: any) {
        return state.editedColumnStatus;
    },
    [BILLING.GETTERS.GETWIDGETTITLE](state: any) {
        return state.widgetTitleData;
    },
    [BILLING.GETTERS.GETWIDGETVALUES](state: any) {
        return state.widgetValueData;
    },

    [BILLING.GETTERS.SENDSTOREDETAILS](state: any) {
        return state.storeDropdown;
    },
    [BILLING.GETTERS.SENDSTOREID](state: any) {
        return state.storeId;
    },
    [BILLING.GETTERS.SENDSTOREMODALDATA](state: any) {
        return state.storeModalData;
    },
    [BILLING.GETTERS.SENDABANDONEDMODALDATA](state: any) {
        return state.abandonedModalData;
    },
    [BILLING.GETTERS.GETUPDATEFILTERPAYLOAD](state: any) {
        return state.newFormattedSaveFilterPayload;
    },
    [BILLING.GETTERS.GETDTTOGGLEDATA](state: any) {
        return state.dtToggleData;
    },
    [BILLING.GETTERS.GETTABCHANGEINFO](state: any) {
        return state.dtTabChangeParams;
    },
});
export default createGetters;
