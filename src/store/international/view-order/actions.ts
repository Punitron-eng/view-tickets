import { VIEWORDERINTL } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData} from '@/api/international/view-order/viewOrderApi';
// import { storeDropdownDetails } from '@/api/domestic/view-order/viewOrderApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [VIEWORDERINTL.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [VIEWORDERINTL.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(VIEWORDERINTL.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(VIEWORDERINTL.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [VIEWORDERINTL.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [VIEWORDERINTL.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [VIEWORDERINTL.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(VIEWORDERINTL.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [VIEWORDERINTL.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        let data = {};
        if (payload.payload.tab_name === 'store_order') {
            data = { ...payload.payload, platform_id: 2, store_id: 9210 };
        }
        console.log(payload, 'payload', data);
        const defaultColumn = await getDefaultColumnData(payload.payload.tab_name === 'store_order' ? { payload: data, url: payload.url } : payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [VIEWORDERINTL.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [VIEWORDERINTL.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [VIEWORDERINTL.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        let data = {};
        if (payload.payload.tab_name === 'store_order') {
            data = { ...payload.payload, platform_id: 2, store_id: 9210 };
        }
        const saveFilterRespo = await getSaveFilterData(payload.payload.tab_name === 'store_order' ? { payload: data, url: payload.url } : payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [VIEWORDERINTL.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(VIEWORDERINTL.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [VIEWORDERINTL.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(VIEWORDERINTL.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [VIEWORDERINTL.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [VIEWORDERINTL.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [VIEWORDERINTL.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(VIEWORDERINTL.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData);
    // },
    // async [VIEWORDERINTL.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
    //     context.commit(VIEWORDERINTL.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue);
    // },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [VIEWORDERINTL.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETSELECTEDROW, payload);
    },
    // For datatable data export
    async [VIEWORDERINTL.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(VIEWORDERINTL.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(VIEWORDERINTL.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(VIEWORDERINTL.MUTATIONS.SETEXPORTSTATUS, data);
    },
    //for datatable action modals
    [VIEWORDERINTL.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },
    // For datatable data
    async [VIEWORDERINTL.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(VIEWORDERINTL.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        // const tempcurrentData = { data: null };
        context.commit(VIEWORDERINTL.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For product/items details modal data
    async [VIEWORDERINTL.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETPRODUCTDETAILS, data);
    },
    // For store details
    // async [VIEWORDERINTL.ACTIONS.GETSTOREDETAILS](context: any) {
    //     const data = await storeDropdownDetails();
    //     context.commit(VIEWORDERINTL.MUTATIONS.SETSTOREDETAILS, data);
    // },
    // For store Modal data
    async [VIEWORDERINTL.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
        const modalData = await storeModalData(payload);
        context.commit(VIEWORDERINTL.MUTATIONS.SETSTOREMODALDATA, modalData);
    },
    // For store id
    [VIEWORDERINTL.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(VIEWORDERINTL.MUTATIONS.SETSTOREID, payload);
    },
});
export default createActions;
