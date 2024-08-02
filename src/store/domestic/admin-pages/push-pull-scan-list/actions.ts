import { PUSHPULLSCANLIST } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, storeDropdownDetails, abandonedModalData } from '@/api/checkout/abandoned-cart/abandonedCart';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [PUSHPULLSCANLIST.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [PUSHPULLSCANLIST.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(PUSHPULLSCANLIST.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [PUSHPULLSCANLIST.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [PUSHPULLSCANLIST.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For product/items details modal data
    async [PUSHPULLSCANLIST.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETPRODUCTDETAILS, data);
    },

    // For store details
    async [PUSHPULLSCANLIST.ACTIONS.GETSTOREDETAILS](context: any) {
        const data = await storeDropdownDetails();
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSTOREDETAILS, data);
    },

    // For store id
    [PUSHPULLSCANLIST.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSTOREID, payload);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [PUSHPULLSCANLIST.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [PUSHPULLSCANLIST.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(PUSHPULLSCANLIST.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(PUSHPULLSCANLIST.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    // [PUSHPULLSCANLIST.ACTIONS.GETDATERANGE](context: any, payload: any) {
    //     context.commit(PUSHPULLSCANLIST.MUTATIONS.SETDATERANGE, payload);
    // },

    // For global search in datatable
    [PUSHPULLSCANLIST.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [PUSHPULLSCANLIST.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [PUSHPULLSCANLIST.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [PUSHPULLSCANLIST.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [PUSHPULLSCANLIST.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [PUSHPULLSCANLIST.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [PUSHPULLSCANLIST.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(PUSHPULLSCANLIST.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [PUSHPULLSCANLIST.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(PUSHPULLSCANLIST.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [PUSHPULLSCANLIST.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [PUSHPULLSCANLIST.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [PUSHPULLSCANLIST.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(PUSHPULLSCANLIST.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [PUSHPULLSCANLIST.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
    //     context.commit(PUSHPULLSCANLIST.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue);
    // },
    async [PUSHPULLSCANLIST.ACTIONS.GETABANDONEDMODALDATA](context: any, payload: any) {
        const data = await abandonedModalData(payload);
        context.commit(PUSHPULLSCANLIST.MUTATIONS.SETABANDONEDMODALDATA, data);
    },
});
export default createActions;
