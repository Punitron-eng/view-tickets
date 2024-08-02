import { BILLINGINTL } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '../../../api/datatable/dataTableApi';
// import {  saveFilterData } from '@/api/billing/billingApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable data
    async [BILLINGINTL.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = { data: null };
        context.commit(BILLINGINTL.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable tabs
    [BILLINGINTL.MUTATIONS.SETSELECTEDTABNAME](state: any, payload) {
        state.selectedTab = payload;
    },
    // For datatable start page count
    [BILLINGINTL.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [BILLINGINTL.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(BILLINGINTL.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(BILLINGINTL.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [BILLINGINTL.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [BILLINGINTL.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [BILLINGINTL.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(BILLINGINTL.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [BILLINGINTL.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(BILLINGINTL.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [BILLINGINTL.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(BILLINGINTL.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [BILLINGINTL.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [BILLINGINTL.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(BILLINGINTL.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [BILLINGINTL.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(BILLINGINTL.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [BILLINGINTL.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(BILLINGINTL.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [BILLINGINTL.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(BILLINGINTL.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(BILLINGINTL.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [BILLINGINTL.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(BILLINGINTL.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },

    // For datatable widgets
    async [BILLINGINTL.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        // const getwidgetData = await widgetTitleData(payload.length);
        context.commit(BILLINGINTL.MUTATIONS.SETWIDGETTITLEDATA, {
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

    async [BILLINGINTL.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        // const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(BILLINGINTL.MUTATIONS.SETWIDGETVALUEDATA, {
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
