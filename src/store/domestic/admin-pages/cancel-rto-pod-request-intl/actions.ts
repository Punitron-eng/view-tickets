import { CANCELRTOPODREQINTL } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '../../../../api/datatable/dataTableApi';
import { getVendorDataApi } from '../../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [CANCELRTOPODREQINTL.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [CANCELRTOPODREQINTL.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CANCELRTOPODREQINTL.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [CANCELRTOPODREQINTL.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [CANCELRTOPODREQINTL.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [CANCELRTOPODREQINTL.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [CANCELRTOPODREQINTL.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [CANCELRTOPODREQINTL.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [CANCELRTOPODREQINTL.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [CANCELRTOPODREQINTL.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CANCELRTOPODREQINTL.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [CANCELRTOPODREQINTL.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CANCELRTOPODREQINTL.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [CANCELRTOPODREQINTL.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [CANCELRTOPODREQINTL.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [CANCELRTOPODREQINTL.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CANCELRTOPODREQINTL.MUTATIONS.SETSELECTEDROW, payload);
    },
});
export default createActions;
