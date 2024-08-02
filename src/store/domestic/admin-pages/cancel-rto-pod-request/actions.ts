import { CANCELRTOPODREQ } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '../../../../api/datatable/dataTableApi';
// import { saveFilterData } from '../../../api/domestic/ndr/ndrApi';
import { getVendorDataApi } from '../../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [CANCELRTOPODREQ.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [CANCELRTOPODREQ.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CANCELRTOPODREQ.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CANCELRTOPODREQ.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CANCELRTOPODREQ.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [CANCELRTOPODREQ.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [CANCELRTOPODREQ.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [CANCELRTOPODREQ.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [CANCELRTOPODREQ.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [CANCELRTOPODREQ.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [CANCELRTOPODREQ.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [CANCELRTOPODREQ.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CANCELRTOPODREQ.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [CANCELRTOPODREQ.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CANCELRTOPODREQ.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CANCELRTOPODREQ.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [CANCELRTOPODREQ.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [CANCELRTOPODREQ.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETSELECTEDROW, payload);
    },
    // For datatable data export
    async [CANCELRTOPODREQ.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(CANCELRTOPODREQ.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(CANCELRTOPODREQ.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETEXPORTSTATUS, data);
    },
    //for datatable action modals
    [CANCELRTOPODREQ.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },
    // For datatable data
    async [CANCELRTOPODREQ.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(CANCELRTOPODREQ.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData= {data: []}
        context.commit(CANCELRTOPODREQ.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For product/items details modal data
    // async [CANCELRTOPODREQ.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(CANCELRTOPODREQ.MUTATIONS.SETPRODUCTDETAILS, data);
    // },
    // For store details
    // async [CANCELRTOPODREQ.ACTIONS.GETSTOREDETAILS](context: any) {
    //     const data = await storeDropdownDetails();
    //     context.commit(CANCELRTOPODREQ.MUTATIONS.SETSTOREDETAILS, data);
    // },
    // For store Modal data
    // async [CANCELRTOPODREQ.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(CANCELRTOPODREQ.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },
    // For store id
    // [CANCELRTOPODREQ.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(CANCELRTOPODREQ.MUTATIONS.SETSTOREID, payload);
    // },
});
export default createActions;
