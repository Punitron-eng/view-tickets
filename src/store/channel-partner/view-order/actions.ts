import { CPVIEWORDER } from './constants';
import { getDefaultColumnData, getSaveFilterData, dataCount, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { getVendorDataApi } from '@/api/VendorModalData';
import { dataTableData, exportBgProcess } from '@/api/channel-partner/view-order/ViewOrderApi';

const createActions = () => ({
    // For datatable start page count
    [CPVIEWORDER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [CPVIEWORDER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CPVIEWORDER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CPVIEWORDER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CPVIEWORDER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [CPVIEWORDER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [CPVIEWORDER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CPVIEWORDER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [CPVIEWORDER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CPVIEWORDER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [CPVIEWORDER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CPVIEWORDER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [CPVIEWORDER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [CPVIEWORDER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CPVIEWORDER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [CPVIEWORDER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CPVIEWORDER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [CPVIEWORDER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CPVIEWORDER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CPVIEWORDER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CPVIEWORDER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [CPVIEWORDER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CPVIEWORDER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data

    async [CPVIEWORDER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(CPVIEWORDER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable data count
    async [CPVIEWORDER.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'channel-partner/user' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(CPVIEWORDER.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },

    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [CPVIEWORDER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETSELECTEDROW, payload);
    },
    async [CPVIEWORDER.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NEWCHECKOUTABAND.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(CPVIEWORDER.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(CPVIEWORDER.MUTATIONS.SETEXPORTSTATUS, data);
    },
    [CPVIEWORDER.ACTIONS.GETDELIVERYTYPEDATA](context: any, payload: any) {
        context.commit(CPVIEWORDER.MUTATIONS.SETDELIVERYTYPEDATA, payload);
    },
});
export default createActions;
