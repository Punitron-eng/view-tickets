import { VIEWPICKUP } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData } from '@/api/store-order/StoreOrderApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [VIEWPICKUP.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [VIEWPICKUP.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(VIEWPICKUP.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(VIEWPICKUP.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [VIEWPICKUP.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [VIEWPICKUP.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [VIEWPICKUP.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(VIEWPICKUP.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [VIEWPICKUP.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(VIEWPICKUP.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [VIEWPICKUP.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(VIEWPICKUP.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [VIEWPICKUP.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [VIEWPICKUP.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(VIEWPICKUP.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [VIEWPICKUP.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(VIEWPICKUP.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [VIEWPICKUP.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(VIEWPICKUP.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [VIEWPICKUP.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(VIEWPICKUP.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [VIEWPICKUP.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(VIEWPICKUP.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [VIEWPICKUP.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(VIEWPICKUP.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(VIEWPICKUP.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [VIEWPICKUP.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(VIEWPICKUP.MUTATIONS.SETSELECTEDROW, payload);
    },
});
export default createActions;
