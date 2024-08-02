import { WEIGHTDISCREPANCY } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import {
    dataTableData,
    exportBgProcess,
    widgetTitleData,
    widgetValueData,
    productData,
    getRaiseModal,
    getEditModalData,
    viewDetailsData,
    imageUpload,
    riseDiscrepancyModel,
    rejectModal,
} from '../../../api/domestic/weight-discrepancy/weightDiscrepancyApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [WEIGHTDISCREPANCY.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [WEIGHTDISCREPANCY.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [WEIGHTDISCREPANCY.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    // async [WEIGHTDISCREPANCY.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
    //     const filterData = context.getters.getMappedFilterValue;

    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         payload['isMountedLoad'] = 1;
    //     } else {
    //         payload['isMountedLoad'] = 0;
    //     }

    //     const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
    //     context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    // },

    // For product/items details modal data
    async [WEIGHTDISCREPANCY.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETPRODUCTDETAILS, data);
    },

    // For store details
    async [WEIGHTDISCREPANCY.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
        const data = await viewDetailsData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSTOREDETAILS, data);
    },

    // // For store Modal data
    // async [WEIGHTDISCREPANCY.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // For store id
    [WEIGHTDISCREPANCY.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSTOREID, payload);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [WEIGHTDISCREPANCY.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [WEIGHTDISCREPANCY.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [WEIGHTDISCREPANCY.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [WEIGHTDISCREPANCY.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [WEIGHTDISCREPANCY.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [WEIGHTDISCREPANCY.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [WEIGHTDISCREPANCY.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [WEIGHTDISCREPANCY.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [WEIGHTDISCREPANCY.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [WEIGHTDISCREPANCY.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(WEIGHTDISCREPANCY.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [WEIGHTDISCREPANCY.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [WEIGHTDISCREPANCY.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [WEIGHTDISCREPANCY.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [WEIGHTDISCREPANCY.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        const getwidgetData = await widgetTitleData(payload.length);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        const temppayload = { length: payload.length, isMountedLoad: '' };
        const filterData = context.getters.getMappedFilterValue;
        if (Object.values(filterData).every((value) => value.trim() == '')) {
            temppayload.isMountedLoad = '1';
        } else {
            temppayload.isMountedLoad = '0';
        }
        const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
        const data = await getRaiseModal(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETRAISEMODALDATA, data);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETSKELETON](context: any, payload: any) {
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETSKELETON, payload);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
        const data = await getEditModalData(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
        const data = await imageUpload(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETIMAGEUPLOAD, data);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
        const data = await riseDiscrepancyModel(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
        const columnData = await rejectModal(payload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETREJECTMODALDATA, columnData);
    },
    async [WEIGHTDISCREPANCY.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const filterData = context.getters.getMappedFilterValue;

        // if (Object.values(filterData).every((value) => value.trim() == '')) {
        //     payload['isMountedLoad'] = 1;
        // } else {
        //     payload['isMountedLoad'] = 0;
        // }

        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For datatable data count
    async [WEIGHTDISCREPANCY.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'weight-discrepancy' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(WEIGHTDISCREPANCY.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
});
export default createActions;
