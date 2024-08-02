import { UPDATECODDETAILS } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '../../../../api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
import { getVendorDataApi } from '../../../../api/VendorModalData';
import { filter } from 'echarts/types/src/export/api/util.js';
const createActions = () => ({
    // For Export selected rows data
    [UPDATECODDETAILS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [UPDATECODDETAILS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(UPDATECODDETAILS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(UPDATECODDETAILS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [UPDATECODDETAILS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [UPDATECODDETAILS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const filterData = context.getters.getMappedFilterValue;

        if (Object.values(filterData).every((value) => value.trim() == '')) {
            payload['isMountedLoad'] = 1;
        } else {
            payload['isMountedLoad'] = 0;
        }

        const currentDatatableData = { data: null };
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For product/items details modal data
    // async [UPDATECODDETAILS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [UPDATECODDETAILS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [UPDATECODDETAILS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [UPDATECODDETAILS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETSTOREID, payload);
    // },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [UPDATECODDETAILS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [UPDATECODDETAILS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(UPDATECODDETAILS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(UPDATECODDETAILS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [UPDATECODDETAILS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [UPDATECODDETAILS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [UPDATECODDETAILS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(UPDATECODDETAILS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [UPDATECODDETAILS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [UPDATECODDETAILS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [UPDATECODDETAILS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [UPDATECODDETAILS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [UPDATECODDETAILS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(UPDATECODDETAILS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [UPDATECODDETAILS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(UPDATECODDETAILS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [UPDATECODDETAILS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(UPDATECODDETAILS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [UPDATECODDETAILS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(UPDATECODDETAILS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [UPDATECODDETAILS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [UPDATECODDETAILS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(UPDATECODDETAILS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
