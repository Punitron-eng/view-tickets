import { STAFFACCOUNT } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    ///////////////Datatable Common Actions Start //////////////////////////

        // For datatable start page count
        [STAFFACCOUNT.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
            context.commit(STAFFACCOUNT.MUTATIONS.SETPAGINATORSTART, payload);
        },

        // For datatable last/length page count
        async [STAFFACCOUNT.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
            const pageCountData = await getPageCount(payload);
            if (pageCountData.page_count) {
                context.commit(STAFFACCOUNT.MUTATIONS.SETPAGINATORLAST, pageCountData);
            } else {
                context.commit(STAFFACCOUNT.MUTATIONS.SETPAGINATORLAST, payload.payload);
            }
        },

        // For datatable vendor data
        async [STAFFACCOUNT.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
            const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
            const data = {
                getvendorData: getvendorData,
                isVendorSearch: payload.isVendorSearch,
            };
            context.commit(STAFFACCOUNT.MUTATIONS.SETVENDORMODALDATA, data);
        },

        // For datatable columns
        async [STAFFACCOUNT.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
            const defaultColumn = await getDefaultColumnData(payload);
            context.commit(STAFFACCOUNT.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
        },

        // For datatable edit columns
        async [STAFFACCOUNT.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
            const columnData = await getDefaultColumnData(payload);
            context.commit(STAFFACCOUNT.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
        },

        // For datatable columnpayload on mounted
        [STAFFACCOUNT.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
            context.commit(STAFFACCOUNT.MUTATIONS.SETDATATABLESIZE, payload);
        },

        // For get Save filter Data
        async [STAFFACCOUNT.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
            const saveFilterRespo = await getSaveFilterData(payload);
            context.commit(STAFFACCOUNT.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
        },

        // For datatable reset vendor data
        async [STAFFACCOUNT.ACTIONS.RESETVENDORDATA](context: any) {
            await context.commit(STAFFACCOUNT.MUTATIONS.UPDATEVENDORDATA);
        },

        // For  datatable savefilter, viewfiltes, open modal
        async [STAFFACCOUNT.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
            await context.commit(STAFFACCOUNT.MUTATIONS.SETOPENMODAL, payload);
        },

        // For Update datatable saveFilter data
        async [STAFFACCOUNT.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
            context.commit(STAFFACCOUNT.MUTATIONS.SETUPDATEFILTERDATA, payload);
            const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
            context.commit(STAFFACCOUNT.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
        },

        // For datatbale delete savefilter
        async [STAFFACCOUNT.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
            const data = await getDeleteUpdateFilterData(payload);
            context.commit(STAFFACCOUNT.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
        },
        async [STAFFACCOUNT.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
            // context.commit(ADMINVIEWUSER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
            const currentDatatableData = {data: null}
            context.commit(STAFFACCOUNT.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
        },

    ///////////////Datatable Common Actions Start //////////////////////////

});
export default createActions;
