import { STOREORDER } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, storeDropdownDetails, storeModalData } from '../../../api/checkout/store-order/StoreOrderApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [STOREORDER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [STOREORDER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(STOREORDER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(STOREORDER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [STOREORDER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [STOREORDER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [STOREORDER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(STOREORDER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [STOREORDER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(STOREORDER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [STOREORDER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(STOREORDER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [STOREORDER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [STOREORDER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(STOREORDER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [STOREORDER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(STOREORDER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [STOREORDER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(STOREORDER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [STOREORDER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(STOREORDER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [STOREORDER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(STOREORDER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [STOREORDER.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        const getwidgetData = await widgetTitleData(payload.length);
        context.commit(STOREORDER.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData);
    },
    async [STOREORDER.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(STOREORDER.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue);
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [STOREORDER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETSELECTEDROW, payload);
    },
    // For datatable data export
    async [STOREORDER.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(STOREORDER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(STOREORDER.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(STOREORDER.MUTATIONS.SETEXPORTSTATUS, data);
    },
    //for datatable action modals
    [STOREORDER.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(STOREORDER.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },
    // For datatable data
    async [STOREORDER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(STOREORDER.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(STOREORDER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For product/items details modal data
    async [STOREORDER.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(STOREORDER.MUTATIONS.SETPRODUCTDETAILS, data);
    },
    // For store details
    async [STOREORDER.ACTIONS.GETSTOREDETAILS](context: any) {
        const data = await storeDropdownDetails();
        context.commit(STOREORDER.MUTATIONS.SETSTOREDETAILS, data);
    },
    // For store Modal data
    async [STOREORDER.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
        const modalData = await storeModalData(payload);
        context.commit(STOREORDER.MUTATIONS.SETSTOREMODALDATA, modalData);
    },
    // For store id
    [STOREORDER.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(STOREORDER.MUTATIONS.SETSTOREID, payload);
    },
    // For datatable data count
    async [STOREORDER.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'checkout-order' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(STOREORDER.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
});
export default createActions;
