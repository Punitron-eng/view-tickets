// 730
import { subDays, format } from 'date-fns';
import { BILLING } from './constants.ts';
import { isobjectLabel, isObject, updateFilterData, isObjectForMinMax, formatFilterData, setFilterValue, clearFilterByField } from '../../commonStoreFuncs.ts';
import { billingVariable as dataVariables, getSyncDateName } from '../../../views/domestic/billing/billing.js';
const createMutations = () => ({
    // For datatable action modals
    [BILLING.MUTATIONS.SETDTMODAL](state: any, { modalName, visibility }) {
        state.dtModal[modalName] = visibility;
    },

    // For datatable store selcted tab name
    [BILLING.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },

    // For datatable data
    [BILLING.MUTATIONS.SETDATATABLEAPIDATA](state: any, payload: any) {
        state.reverseData = payload;
    },

    // For reset datatable data
    [BILLING.MUTATIONS.RESETREVERSEORDERDATA](state: any) {
        state.reverseData = '';
    },

    // For datatable filter apply

    [BILLING.MUTATIONS.SETFILTERVALUDATA](state, payloads) {
        setFilterValue(state, payloads);
    },

    // For datatable filter clear by field
    [BILLING.MUTATIONS.CLEARFILTERBYFIELD](state, key) {
        const item = state.allFilterData[key];
        const tempFilterData = { ...state.allFilterData };

        if (typeof item === 'object') {
            if (Array.isArray(item)) {
                tempFilterData[key] = [];
            } else if (item.min || item.max) {
                tempFilterData[key] = '';
            } else {
                getSyncDateName();
                if ('label' in item) {
                    tempFilterData[key] = { id: '', value: '', label: '' };
                } else {
                    tempFilterData[key] = { id: [], value: [] };
                }
                if (key === dataVariables.value.syncDateName) {
                    const startDate = subDays(new Date(), 29);
                    const endDate = new Date();
                    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                    tempFilterData[key].value = `${formattedStartDate} ${formattedEndDate}`;
                    tempFilterData[key].id = 'last_30_days';
                }
            }
        } else {
            tempFilterData[key] = '';
        }

        state.allFilterData = { ...tempFilterData };
    },

    // For datatable clear all filters
    [BILLING.MUTATIONS.CLEARALLFILTER](state) {
        state.allFilterData = {
            remittance_id: '',
            cn_no: '',
            invoice_id: '',
            order_id: '',
            bad_debt_no: '',
            transaction_id: '',
            claim_id: '',
            remittance_date: {
                id: '',
                value: '',
                label: '',
            },
            order_date: {
                id: '',
                value: '',
                label: '',
            },
            bad_debt_created_date: {
                id: '',
                value: '',
                label: '',
            },
            cn_date: {
                id: '',
                value: '',
                label: '',
            },
            invoice_date: {
                id: '',
                value: '',
                label: '',
            },
            cancel_request_date: {
                id: '',
                value: '',
                label: '',
            },
            wallet_transactions_date: {
                id: '',
                value: '',
                label: '',
            },
            billing_invoice_due_date: {
                id: '',
                value: '',
                label: '',
            },
            remittance_plan: {
                id: [],
                value: [],
            },
            awb_no_logistics: {
                id: [],
                value: [],
            },
            invoice_type: {
                id: [],
                value: [],
            },
            remittance_status: {
                id: [],
                value: [],
            },
            order_type: {
                id: [],
                value: [],
            },
            bad_debt_type: {
                id: [],
                value: [],
            },
            cn_status: {
                id: [],
                value: [],
            },
            billing_zone: {
                id: [],
                value: [],
            },
            cn_type: {
                id: [],
                value: [],
            },
            order_cancel_status: {
                id: [],
                value: [],
            },
            tracking_status: {
                id: [],
                value: [],
            },
            billing_invoice_status: {
                id: [],
                value: [],
            },
            claim_status: {
                id: [],
                value: [],
            },
            order_product_quantity: {
                id: [],
                value: [],
            },
            vendor_name: {
                id: [],
                value: [],
            },
            cod_generated: '',
            bill_adjusted: '',
            refund_adjusted: '',
            wallet_transfer: '',
            cod_remitted: '',
            billing_weight: '',
            total_freight_charge: '',
            wallet_debit: '',
            wallet_credit: '',
            wallet_balance: '',
            billing_invoice_amount: '',
            billing_cod_adjusted: '',
            billing_credit_note_amount: '',
            order_amount: '',
            billing_tds: '',
            billing_wallet_adjusted: '',
            billing_amount_received: '',
            billing_paid_amount: '',
            billing_round_off: '',
            billing_outstanding: '',
            cn_generated: '',
            cn_available: '',
            bad_debt_amount: '',
            cn_amount: '',
            claim_received: '',
            early_cod: '',
            advance_hold: '',
            paginatorStart: 0,
            paginatorLast: 10,
            search: '',
        };
        getSyncDateName();
        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = dataVariables.value.syncDateName;

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },

    // For datatable data export
    [BILLING.MUTATIONS.SETBILLINGEXPORT](state: any, payload: any) {
        state.exportPayload = payload;
    },

    // For datatable start page count
    [BILLING.MUTATIONS.SETPAGINATORSTART](state: any, payload: any) {
        state.allFilterData.paginatorStart = payload;
    },

    // For datatable last/length page count
    [BILLING.MUTATIONS.SETPAGINATORLAST](state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },

    // For global date range
    [BILLING.MUTATIONS.SETDATERANGE](state, payload) {
        const dateKey = Object.keys(payload)[0];
        state.allFilterData[dateKey].value = payload[dateKey].date;
        state.allFilterData[dateKey].id = payload[dateKey].selectedLabel;
    },

    // For global search
    [BILLING.MUTATIONS.SETORDERINPUT](state: any, payload: any) {
        state.allFilterData.search = payload;
    },

    // For datatable vendor data
    [BILLING.MUTATIONS.SETVENDORMODALDATA](state, payload) {
        state.vendorData = payload.isVendorSearch ? payload.getvendorData.all_vendors_data_array : state.vendorData.concat(payload.getvendorData.all_vendors_data_array);
        state.vendorDataStatus = payload.getvendorData.is_more_data;
    },

    // For datatable Columns
    [BILLING.MUTATIONS.SETDEFAULTCOLUMN](state: any, payload: any) {
        state.DefaultColumn = payload;
    },

    // For datatable edit columns
    [BILLING.MUTATIONS.SETEDITEDCOLUMNSDATA](state: any, payload: any) {
        state.editedColumnStatus = payload;
    },

    // For datatable columnpayload on mounted
    [BILLING.MUTATIONS.SETDATATABLESIZE](state: any, payload: any) {
        state.dataTableSizePayload = payload;
    },

    // For datatable apply selected save filter
    [BILLING.MUTATIONS.SETAPPLYSAVEDFILTEREDDATA](state, selectedData) {
        const response = selectedData.filterArr;
        response.forEach((payload) => {
            const dataKey = Object.keys(payload)[0];
            const temp = { id: [], value: [] };
            switch (payload.type) {
                case 'dateRange':
                    const dateRangeData = payload[dataKey];
                    updateFilterData(state, dataKey, { id: dateRangeData.id, value: dateRangeData.value, label: dateRangeData.label });
                    break;
                case 'multiSelect':
                case 'vendorModal':
                    temp.id = payload[dataKey].id;
                    temp.value = payload[dataKey].value;
                    updateFilterData(state, dataKey, { ...temp });
                    break;
                case 'radio':
                case 'search':
                case 'sort':
                case 'minMax':
                case 'dropdownRadio':
                    updateFilterData(state, dataKey, payload[dataKey]);
                    break;
            }
        });
    },

    // For Update datatable saveFilter data
    [BILLING.MUTATIONS.SETSAVEFILTERDATA](state: any, payload: any) {
        state.saveFilterResponse = payload;
    },

    // For datatable data export
    [BILLING.MUTATIONS.SETEXPORTSTATUS](state: any, payload: any) {
        state.exportStatus = payload;
    },

    // For reset vendor data
    [BILLING.MUTATIONS.UPDATEVENDORDATA](state: any) {
        state.vendorData = [];
    },

    // For  datatable savefilter, viewfiltes, open modal
    [BILLING.MUTATIONS.SETOPENMODAL](state: any, payload: any) {
        state.openModal[payload] = true;
    },

    // For  datatable savefilter, viewfiltes, close modal
    [BILLING.MUTATIONS.SETOPENMODALFALSE](state: any, payload: any) {
        state.openModal[payload] = false;
    },

    // For Export selected rows data
    [BILLING.MUTATIONS.SETSELECTEDROW](state: any, payload: any) {
        state.selectedCheckbox = payload;
    },

    // For product/order_product_quantity details modal data
    [BILLING.MUTATIONS.SETPRODUCTDETAILS](state: any, payload: any) {
        state.productDetails = payload;
    },

    // For get Save filter Data
    [BILLING.MUTATIONS.SETVIEWSAVEDFILTEREDDATA](state: any, payload: any) {
        state.viewSaveFilteredData = [];

        let newDataTableFilterPayload: any = [];

        if (payload.data && payload.data.length > 0) {
            newDataTableFilterPayload = payload.data.map((res) => (res.filter_payload ? res.filter_payload : null)).filter((res) => res !== null);
        }
        newDataTableFilterPayload.forEach((item, index) => {
            let tempFilterObject = {
                remittance_id: '',
                cn_no: '',
                invoice_id: '',
                order_id: '',
                bad_debt_no: '',
                transaction_id: '',
                claim_id: '',
                remittance_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                order_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                bad_debt_created_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                cn_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                invoice_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                cancel_request_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                wallet_transactions_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                billing_invoice_due_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                remittance_plan: {
                    id: [],
                    value: [],
                },
                awb_no_logistics: {
                    id: [],
                    value: [],
                },
                invoice_type: {
                    id: [],
                    value: [],
                },
                remittance_status: {
                    id: [],
                    value: [],
                },
                order_type: {
                    id: [],
                    value: [],
                },
                bad_debt_type: {
                    id: [],
                    value: [],
                },
                cn_status: {
                    id: [],
                    value: [],
                },
                billing_zone: {
                    id: [],
                    value: [],
                },
                cn_type: {
                    id: [],
                    value: [],
                },
                order_cancel_status: {
                    id: [],
                    value: [],
                },
                tracking_status: {
                    id: [],
                    value: [],
                },
                billing_invoice_status: {
                    id: [],
                    value: [],
                },
                claim_status: {
                    id: [],
                    value: [],
                },
                order_product_quantity: {
                    id: [],
                    value: [],
                },
                vendor_name: {
                    id: [],
                    value: [],
                },
                cod_generated: '',
                bill_adjusted: '',
                refund_adjusted: '',
                wallet_transfer: '',
                cod_remitted: '',
                billing_weight: '',
                total_freight_charge: '',
                wallet_debit: '',
                wallet_credit: '',
                wallet_balance: '',
                billing_invoice_amount: '',
                billing_cod_adjusted: '',
                billing_credit_note_amount: '',
                order_amount: '',
                billing_tds: '',
                billing_wallet_adjusted: '',
                billing_amount_received: '',
                billing_paid_amount: '',
                billing_round_off: '',
                billing_outstanding: '',
                cn_generated: '',
                cn_available: '',
                bad_debt_amount: '',
                cn_amount: '',
                claim_received: '',
                early_cod: '',
                advance_hold: '',
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
            };
            item.forEach((payload) => {
                const dataKey = Object.keys(payload)[1];
                const datetemp = { id: [], value: [], label: '' };
                const temp = { id: [], value: [] };
                switch (payload.type) {
                    case 'dateRange':
                        datetemp.id = payload[dataKey].id;
                        datetemp.value = payload[dataKey].value;
                        datetemp.label = payload[dataKey].id;
                        tempFilterObject = { ...tempFilterObject, [dataKey]: { ...datetemp } };
                        break;
                    case 'multiSelect':
                    case 'vendorModal':
                        temp.id = payload[dataKey].id;
                        temp.value = payload[dataKey].value;
                        tempFilterObject = { ...tempFilterObject, [dataKey]: { ...temp } };
                        break;
                    case 'search':
                    case 'radio':
                    case 'minMax':
                    case 'dropdownRadio':
                        tempFilterObject[dataKey] = payload[dataKey];
                        tempFilterObject = { ...tempFilterObject };
                        break;
                }
            });
            tempFilterObject['name'] = payload.data[index].filter_name;
            tempFilterObject['id'] = payload.data[index].id;
            tempFilterObject['is_pinned'] = payload.data[index].is_pinned;
            state.viewSaveFilteredData.push(tempFilterObject);

            state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
                const filteredItem = {};
                if (item) {
                    for (const key in item) {
                        const value = item[key];
                        if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || isObjectForMinMax(value) || key === 'id' || key === 'is_pinned') {
                            filteredItem[key] = value;
                        }
                    }
                }

                return filteredItem;
            });
        });
    },

    // For reset save filter data
    [BILLING.MUTATIONS.SETRESETSAVEDFILTEREDDATA](state: any) {
        state.viewSaveFilteredData = [];
    },

    [BILLING.MUTATIONS.SETUPDATEFILTERDATA](state: any, data: any) {
        const payload = data.tempData;
        state.newFormattedSaveFilterPayload = formatFilterData(data.newFilter || data.updatedFrom ? state.allFilterData : payload);
    },
    // For widget Title
    [BILLING.MUTATIONS.SETWIDGETTITLEDATA](state: any, payload: any) {
        state.widgetTitleData = payload.all_widgets_data_array;

    },
    // For widget Value
    [BILLING.MUTATIONS.SETWIDGETVALUEDATA](state: any, payload: any) {
        state.widgetValueData = payload.all_widgets_data_array;

    },

    // For datatbale delete savefilter
    [BILLING.MUTATIONS.SETUPDATEDELETEFILTERARRAY](state: any, payload: any) {
        state.responseMessage = payload;
    },

    // For datatable get applied vendor
    [BILLING.MUTATIONS.SETAPPLIEDVENDORDATA](state: any, payload: any) {
        state.allFilterData.vendor_name.id = [];
        state.allFilterData.vendor_name.value = [];
        payload.vendor_name.forEach((values: any) => {
            const data = values.split(',');
            state.allFilterData.vendor_name.id.push(data[1]);
            state.allFilterData.vendor_name.value.push(data[0]);
        });
    },
    [BILLING.MUTATIONS.SETSTOREDETAILS](state: any, payload: any) {
        state.storeDropdown = payload.data;
    },
    [BILLING.MUTATIONS.SETSTOREID](state: any, payload: any) {
        state.storeId = payload;
    },
    [BILLING.MUTATIONS.SETABANDONEDMODALDATA](state: any, payload: any) {
        state.abandonedModalData = payload;
    },
    [BILLING.MUTATIONS.SETSUBTABNAME](state: any, payload: any) {
        state.dtToggleData = payload;
    },
    [BILLING.MUTATIONS.CHANGEDTTAB](state: any, payload: any) {
        state.dtTabChangeParams = payload;
    },
});
export default createMutations;

// Helper method to check if a value is an object
