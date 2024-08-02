import { REMITTANCEPLAN } from './constants';
import { getDefaultColumnData, getSaveFilterData,saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    ///////////////Datatable Common Actions Start //////////////////////////

        // For datatable start page count
        [REMITTANCEPLAN.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
            context.commit(REMITTANCEPLAN.MUTATIONS.SETPAGINATORSTART, payload);
        },

        // For datatable last/length page count
        async [REMITTANCEPLAN.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
            const pageCountData = await getPageCount(payload);
            if (pageCountData.page_count) {
                context.commit(REMITTANCEPLAN.MUTATIONS.SETPAGINATORLAST, pageCountData);
            } else {
                context.commit(REMITTANCEPLAN.MUTATIONS.SETPAGINATORLAST, payload.payload);
            }
        },

        // For datatable vendor data
        async [REMITTANCEPLAN.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
            const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
            const data = {
                getvendorData: getvendorData,
                isVendorSearch: payload.isVendorSearch,
            };
            context.commit(REMITTANCEPLAN.MUTATIONS.SETVENDORMODALDATA, data);
        },

        // For datatable columns
        async [REMITTANCEPLAN.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
            const defaultColumn = await getDefaultColumnData(payload);
            context.commit(REMITTANCEPLAN.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
        },

        // For datatable edit columns
        async [REMITTANCEPLAN.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
            const columnData = await getDefaultColumnData(payload);
            context.commit(REMITTANCEPLAN.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
        },

        // For datatable columnpayload on mounted
        [REMITTANCEPLAN.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
            context.commit(REMITTANCEPLAN.MUTATIONS.SETDATATABLESIZE, payload);
        },

        // For get Save filter Data
        async [REMITTANCEPLAN.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
            const saveFilterRespo = await getSaveFilterData(payload);
            context.commit(REMITTANCEPLAN.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
        },
        // For global date range
        [REMITTANCEPLAN.ACTIONS.GETDATERANGE](context: any, payload: any) {
            context.commit(REMITTANCEPLAN.MUTATIONS.SETDATERANGE, payload);
        },
        // For datatable reset vendor data
        async [REMITTANCEPLAN.ACTIONS.RESETVENDORDATA](context: any) {
            await context.commit(REMITTANCEPLAN.MUTATIONS.UPDATEVENDORDATA);
        },

        // For  datatable savefilter, viewfiltes, open modal
        async [REMITTANCEPLAN.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
            await context.commit(REMITTANCEPLAN.MUTATIONS.SETOPENMODAL, payload);
        },

        // For Update datatable saveFilter data
        async [REMITTANCEPLAN.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
            context.commit(REMITTANCEPLAN.MUTATIONS.SETUPDATEFILTERDATA, payload);
            const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
            context.commit(REMITTANCEPLAN.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
        },

        // For datatbale delete savefilter
        async [REMITTANCEPLAN.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
            const data = await getDeleteUpdateFilterData(payload);
            context.commit(REMITTANCEPLAN.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
        },
        async [REMITTANCEPLAN.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
            // context.commit(ADMINVIEWUSER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
            const currentDatatableData = {data: null}
            context.commit(REMITTANCEPLAN.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
        },

    ///////////////Datatable Common Actions Start //////////////////////////
    
});
export default createActions;
