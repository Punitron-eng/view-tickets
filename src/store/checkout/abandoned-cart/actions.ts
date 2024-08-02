import { ABANDONEDCART } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, storeDropdownDetails, abandonedModalData } from '../../../api/checkout/abandoned-cart/abandonedCart';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [ABANDONEDCART.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [ABANDONEDCART.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(ABANDONEDCART.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(ABANDONEDCART.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(ABANDONEDCART.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [ABANDONEDCART.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(ABANDONEDCART.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [ABANDONEDCART.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(ABANDONEDCART.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        context.commit(ABANDONEDCART.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For product/items details modal data
    async [ABANDONEDCART.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETPRODUCTDETAILS, data);
    },

    // For store details
    async [ABANDONEDCART.ACTIONS.GETSTOREDETAILS](context: any) {
        const data = await storeDropdownDetails();
        context.commit(ABANDONEDCART.MUTATIONS.SETSTOREDETAILS, data);
    },

    // For store id
    [ABANDONEDCART.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETSTOREID, payload);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [ABANDONEDCART.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [ABANDONEDCART.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(ABANDONEDCART.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(ABANDONEDCART.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [ABANDONEDCART.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [ABANDONEDCART.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [ABANDONEDCART.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(ABANDONEDCART.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [ABANDONEDCART.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [ABANDONEDCART.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [ABANDONEDCART.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [ABANDONEDCART.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [ABANDONEDCART.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(ABANDONEDCART.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [ABANDONEDCART.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(ABANDONEDCART.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [ABANDONEDCART.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(ABANDONEDCART.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(ABANDONEDCART.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [ABANDONEDCART.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [ABANDONEDCART.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        const getwidgetData = await widgetTitleData(payload.length);
        context.commit(ABANDONEDCART.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    },
    async [ABANDONEDCART.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(ABANDONEDCART.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    },
    async [ABANDONEDCART.ACTIONS.GETABANDONEDMODALDATA](context: any, payload: any) {
        const data = await abandonedModalData(payload);
        context.commit(ABANDONEDCART.MUTATIONS.SETABANDONEDMODALDATA, data);
    },
    async [ABANDONEDCART.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'abandoned-checkout' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(ABANDONEDCART.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
});
export default createActions;
