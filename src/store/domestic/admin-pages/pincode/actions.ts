import { PINCODE } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, storeDropdownDetails, abandonedModalData } from '@/api/checkout/abandoned-cart/abandonedCart';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [PINCODE.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [PINCODE.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(PINCODE.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(PINCODE.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(PINCODE.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [PINCODE.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(PINCODE.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [PINCODE.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(PINCODE.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(PINCODE.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For product/items details modal data
    // async [PINCODE.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(PINCODE.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [PINCODE.ACTIONS.GETSTOREDETAILS](context: any) {
    //     const data = await storeDropdownDetails();
    //     context.commit(PINCODE.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store id
    // [PINCODE.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(PINCODE.MUTATIONS.SETSTOREID, payload);
    // },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [PINCODE.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [PINCODE.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(PINCODE.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(PINCODE.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [PINCODE.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [PINCODE.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [PINCODE.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(PINCODE.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [PINCODE.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(PINCODE.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [PINCODE.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(PINCODE.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [PINCODE.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [PINCODE.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(PINCODE.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [PINCODE.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(PINCODE.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [PINCODE.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(PINCODE.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [PINCODE.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(PINCODE.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(PINCODE.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [PINCODE.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(PINCODE.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [PINCODE.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(PINCODE.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [PINCODE.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
    //     context.commit(PINCODE.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue);
    // },
    // async [PINCODE.ACTIONS.GETABANDONEDMODALDATA](context: any, payload: any) {
    //     const data = await abandonedModalData(payload);
    //     context.commit(PINCODE.MUTATIONS.SETABANDONEDMODALDATA, data);
    // },
});
export default createActions;
