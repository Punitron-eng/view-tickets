import { VIEWNDR } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '../../../api/datatable/dataTableApi';
// import { saveFilterData } from '../../../api/domestic/ndr/ndrApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [VIEWNDR.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [VIEWNDR.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(VIEWNDR.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(VIEWNDR.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [VIEWNDR.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [VIEWNDR.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [VIEWNDR.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(VIEWNDR.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [VIEWNDR.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [VIEWNDR.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [VIEWNDR.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [VIEWNDR.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [VIEWNDR.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(VIEWNDR.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [VIEWNDR.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(VIEWNDR.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [VIEWNDR.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(VIEWNDR.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [VIEWNDR.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [VIEWNDR.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETSELECTEDROW, payload);
    },
    // For datatable data export
    async [VIEWNDR.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(VIEWNDR.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(VIEWNDR.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(VIEWNDR.MUTATIONS.SETEXPORTSTATUS, data);
    },
    //for datatable action modals
    [VIEWNDR.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(VIEWNDR.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },
    // For datatable data
    async [VIEWNDR.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(VIEWNDR.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(VIEWNDR.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For product/items details modal data
    async [VIEWNDR.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETPRODUCTDETAILS, data);
    },
    // For store details
    // async [VIEWNDR.ACTIONS.GETSTOREDETAILS](context: any) {
    //     const data = await storeDropdownDetails();
    //     context.commit(VIEWNDR.MUTATIONS.SETSTOREDETAILS, data);
    // },
    // For store Modal data
    async [VIEWNDR.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
        const modalData = await storeModalData(payload);
        context.commit(VIEWNDR.MUTATIONS.SETSTOREMODALDATA, modalData);
    },
    // For store id
    [VIEWNDR.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(VIEWNDR.MUTATIONS.SETSTOREID, payload);
    },
});
export default createActions;
