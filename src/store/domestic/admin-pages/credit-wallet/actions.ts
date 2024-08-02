import { CREDITWALLET } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData } from '@/api/store-order/StoreOrderApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [CREDITWALLET.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [CREDITWALLET.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CREDITWALLET.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CREDITWALLET.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CREDITWALLET.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [CREDITWALLET.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [CREDITWALLET.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CREDITWALLET.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [CREDITWALLET.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CREDITWALLET.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [CREDITWALLET.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CREDITWALLET.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [CREDITWALLET.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [CREDITWALLET.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CREDITWALLET.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [CREDITWALLET.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CREDITWALLET.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [CREDITWALLET.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CREDITWALLET.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CREDITWALLET.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CREDITWALLET.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [CREDITWALLET.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CREDITWALLET.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable data
    async [CREDITWALLET.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(CREDITWALLET.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData ={data:null}
                context.commit(CREDITWALLET.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [CREDITWALLET.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CREDITWALLET.MUTATIONS.SETSELECTEDROW, payload);
    },
    
});
export default createActions;
