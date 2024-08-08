import { CPVIEWUSER } from './constants';
import { getDefaultColumnData, getSaveFilterData, dataCount, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { getVendorDataApi } from '@/api/VendorModalData';
import { dataTableData } from '@/api/channel-partner/view-user/ViewUserApi';

const createActions = () => ({
    // For datatable start page count
    [CPVIEWUSER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [CPVIEWUSER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CPVIEWUSER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CPVIEWUSER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CPVIEWUSER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [CPVIEWUSER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [CPVIEWUSER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CPVIEWUSER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [CPVIEWUSER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CPVIEWUSER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [CPVIEWUSER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CPVIEWUSER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [CPVIEWUSER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [CPVIEWUSER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CPVIEWUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [CPVIEWUSER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CPVIEWUSER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [CPVIEWUSER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CPVIEWUSER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CPVIEWUSER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CPVIEWUSER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [CPVIEWUSER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CPVIEWUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [CPVIEWUSER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(CPVIEWUSER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable data count
    async [CPVIEWUSER.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'channel-partner/user' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(CPVIEWUSER.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [CPVIEWUSER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CPVIEWUSER.MUTATIONS.SETSELECTEDROW, payload);
    },

    async [CPVIEWUSER.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(CPVIEWUSER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(CPVIEWUSER.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(CPVIEWUSER.MUTATIONS.SETEXPORTSTATUS, data);
    },
});
export default createActions;
