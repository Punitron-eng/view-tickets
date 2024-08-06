import { RETURN } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import {
    dataTableData,
    exportBgProcess,
    getDataTableTab,
    productData,
    viewDetailsApi,
    rejectDetailsApi,
    pickNowDetailsApi,
    pickNowSubmitData,
    cancelOrderApi,
    activityApi,
    warehouseApi,
    submitPickNowApi,
    getWeightApiData,
    getCityStateApi,
    exportOrderCount,
} from '../../../api/domestic/return-flow/ReturnFlowApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For view details modal data
    async [RETURN.ACTIONS.GETVIEWDETAILS](context: any, payload: any) {
        const viewDetailsData = await viewDetailsApi(payload);
        await context.commit(RETURN.MUTATIONS.SETVIEWDETAILS, viewDetailsData);
    },

    // For reject details modal data
    async [RETURN.ACTIONS.GETREJECTDETAILS](context: any, payload: any) {
        const viewDetailsData = await rejectDetailsApi(payload);
        await context.commit(RETURN.MUTATIONS.SETREJECTDETAILS, viewDetailsData);
    },

    // For picknow details modal data
    async [RETURN.ACTIONS.GETPICKNOWDETAILS](context: any, payload: any) {
        const picknowDetails = await pickNowDetailsApi(payload);
        await context.commit(RETURN.MUTATIONS.SETPICKNOWDETAILS, picknowDetails);
    },

    // For submit picknow modal data
    async [RETURN.ACTIONS.GETPICKNOWSUBMIT](context: any, payload: any) {
        const picknowDetails = await pickNowSubmitData(payload);
        await context.commit(RETURN.MUTATIONS.SETPICKNOWSUBMIT, picknowDetails);
    },

    // For Cancel modal data
    async [RETURN.ACTIONS.GETCANCELORDER](context: any, payload: any) {
        const data = await cancelOrderApi(payload);
        context.commit(RETURN.MUTATIONS.SETCANCELORDER, data);
    },

    // For view details modal
    async [RETURN.ACTIONS.GETVIEWDETAILMODAL](context: any, payload: any) {
        const data = await activityApi(payload);
        context.commit(RETURN.MUTATIONS.SETVIEWDETAILMODAL, data);
    },

    // For warehouse data
    async [RETURN.ACTIONS.GETSTRIPWAREHOUSE](context: any, payload: any) {
        const data = await warehouseApi(payload);
        context.commit(RETURN.MUTATIONS.SETSTRIPWAREHOUSE, data);
    },

    // For submit picknow warehouse data
    async [RETURN.ACTIONS.GETPICKNOWWAREHOUSE](context: any, payload: any) {
        const data = await submitPickNowApi(payload);
        context.commit(RETURN.MUTATIONS.SETPICKNOWWAREHOUSE, data);
    },

    // For get city/state data
    async [RETURN.ACTIONS.GETCITYSTATE](context: any, payload: any) {
        const data = await getCityStateApi(payload);
        context.commit(RETURN.MUTATIONS.SETCITYSTATE, data);
    },

    // For update the weight Column data
    async [RETURN.ACTIONS.GETWEIGHTDATA](context: any, payload: any) {
        const data = await getWeightApiData(payload);
        context.commit(RETURN.MUTATIONS.SETWEIGHTDATA, data);
    },

    // For exportcount datatable data
    async [RETURN.ACTIONS.GETEXPORTCOUNT](context: any, payload: any) {
        const updatedPayload = {
            ...payload,
            filter_order_date: context.getters.getExportValuePayload.order_date,
            filter_order_label: context.getters.getExportValuePayload.orderDateLable,
        };
        const data = await exportOrderCount(updatedPayload);
        context.commit(RETURN.MUTATIONS.SETEXPORTCOUNTDATA, data);
    },

    // For Export selected rows data
    [RETURN.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [RETURN.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(RETURN.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(RETURN.MUTATIONS.SETEXPORTSTATUS, data);
    },

    // For datatable data
    async [RETURN.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        context.commit(RETURN.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable data count
    async [RETURN.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'reverse' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(RETURN.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },

    // For datatable tabs
    async [RETURN.ACTIONS.UPDATEDATATABLETABS](context: any, payload: any) {
        const dataTableTabs = await getDataTableTab(payload);
        await context.commit(RETURN.MUTATIONS.SETDATATABLETABS, dataTableTabs);
    },

    // For product/items details modal data
    async [RETURN.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(RETURN.MUTATIONS.SETPRODUCTDETAILS, data);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [RETURN.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [RETURN.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(RETURN.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(RETURN.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [RETURN.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [RETURN.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [RETURN.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(RETURN.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [RETURN.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(RETURN.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [RETURN.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(RETURN.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [RETURN.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [RETURN.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(RETURN.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [RETURN.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(RETURN.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [RETURN.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(RETURN.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [RETURN.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(RETURN.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(RETURN.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [RETURN.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(RETURN.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
});
export default createActions;
