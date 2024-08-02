import { BILLING } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '../../../api/datatable/dataTableApi';
// import {  saveFilterData } from '@/api/billing/billingApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable data
    async [BILLING.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = { data: null };
        context.commit(BILLING.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable tabs
    [BILLING.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },
    // For datatable start page count
    [BILLING.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [BILLING.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(BILLING.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(BILLING.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [BILLING.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [BILLING.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [BILLING.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(BILLING.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [BILLING.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(BILLING.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [BILLING.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(BILLING.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [BILLING.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [BILLING.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(BILLING.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [BILLING.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(BILLING.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [BILLING.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(BILLING.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [BILLING.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(BILLING.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(BILLING.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [BILLING.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(BILLING.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },

    // For datatable widgets
    async [BILLING.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        // const getwidgetData = await widgetTitleData(payload.length);
        context.commit(BILLING.MUTATIONS.SETWIDGETTITLEDATA, {
            "all_widgets_data_array": {
                "0": {
                    "name": "TOTAL DISCREPANCY"
                },
                "1": {
                    "name": "APPROVED DISCREPANCY"
                },
                "2": {
                    "name": "REJECTED DISCREPANCY"
                },
                "3": {
                    "name": "AUTO ACCEPTED DISCREPANCY"
                },
            },
            "status": "success"
        });
    },

    async [BILLING.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        // const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(BILLING.MUTATIONS.SETWIDGETVALUEDATA, {
            "status": "success",
            "all_widgets_data_array": {
                "0": {
                    "value": Math.floor(Math.random() * 10),
                    "percentage": "0%",
                    "isWidgetUpArrow": ""
                },
                "1": {
                    "value": "0",
                    "percentage": "0%",
                    "isWidgetUpArrow": ""
                },
                "2": {
                    "value": "0",
                    "percentage": "0%",
                    "isWidgetUpArrow": ""
                },
                "3": {
                    "value": "0",
                    "percentage": "0%",
                    "isWidgetUpArrow": ""
                },
            }
        });
    },
});
export default createActions;
