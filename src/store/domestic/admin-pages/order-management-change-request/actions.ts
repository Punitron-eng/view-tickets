import { ORDERMANAGEMENTREQ } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '../../../../api/datatable/dataTableApi';
import { getVendorDataApi } from '../../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [ORDERMANAGEMENTREQ.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [ORDERMANAGEMENTREQ.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [ORDERMANAGEMENTREQ.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [ORDERMANAGEMENTREQ.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [ORDERMANAGEMENTREQ.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [ORDERMANAGEMENTREQ.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        console.log(payload, 'inside the order store action');

        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [ORDERMANAGEMENTREQ.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [ORDERMANAGEMENTREQ.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [ORDERMANAGEMENTREQ.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [ORDERMANAGEMENTREQ.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(ORDERMANAGEMENTREQ.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [ORDERMANAGEMENTREQ.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [ORDERMANAGEMENTREQ.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [ORDERMANAGEMENTREQ.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [ORDERMANAGEMENTREQ.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const tempcurrentData = { data: null };
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETDATATABLEAPIDATA, tempcurrentData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [ORDERMANAGEMENTREQ.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(ORDERMANAGEMENTREQ.MUTATIONS.SETSELECTEDROW, payload);
    },
});
export default createActions;
