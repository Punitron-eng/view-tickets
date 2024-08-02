import { ONBOARDUSER } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData } from '@/api/store-order/StoreOrderApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [ONBOARDUSER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [ONBOARDUSER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(ONBOARDUSER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(ONBOARDUSER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [ONBOARDUSER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [ONBOARDUSER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [ONBOARDUSER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(ONBOARDUSER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [ONBOARDUSER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(ONBOARDUSER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [ONBOARDUSER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(ONBOARDUSER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [ONBOARDUSER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [ONBOARDUSER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(ONBOARDUSER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [ONBOARDUSER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(ONBOARDUSER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [ONBOARDUSER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(ONBOARDUSER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [ONBOARDUSER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(ONBOARDUSER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [ONBOARDUSER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(ONBOARDUSER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [ONBOARDUSER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(ONBOARDUSER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(ONBOARDUSER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [ONBOARDUSER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(ONBOARDUSER.MUTATIONS.SETSELECTEDROW, payload);
    },
    
});
export default createActions;
