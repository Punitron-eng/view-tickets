import { ADMINVIEWUSER } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '../../../../api/datatable/dataTableApi';
import { getVendorDataApi } from '../../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [ADMINVIEWUSER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [ADMINVIEWUSER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(ADMINVIEWUSER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(ADMINVIEWUSER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [ADMINVIEWUSER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [ADMINVIEWUSER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [ADMINVIEWUSER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(ADMINVIEWUSER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [ADMINVIEWUSER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(ADMINVIEWUSER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [ADMINVIEWUSER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(ADMINVIEWUSER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [ADMINVIEWUSER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [ADMINVIEWUSER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        let data = {};
        if (payload.payload.tab_name === 'store_order') {
            data = { ...payload.payload, platform_id: 2, store_id: 9210 };
        }
        const saveFilterRespo = await getSaveFilterData(payload.payload.tab_name === 'store_order' ? { payload: data, url: payload.url } : payload);

        context.commit(ADMINVIEWUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [ADMINVIEWUSER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(ADMINVIEWUSER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [ADMINVIEWUSER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(ADMINVIEWUSER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [ADMINVIEWUSER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(ADMINVIEWUSER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [ADMINVIEWUSER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(ADMINVIEWUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [ADMINVIEWUSER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(ADMINVIEWUSER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(ADMINVIEWUSER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [ADMINVIEWUSER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(ADMINVIEWUSER.MUTATIONS.SETSELECTEDROW, payload);
    },
});
export default createActions;
