import { NONNDRCALLDETAILS } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
import { getVendorDataApi } from '@/api/VendorModalData';
import { filter } from 'echarts/types/src/export/api/util.js';
const createActions = () => ({
    // For Export selected rows data
    [NONNDRCALLDETAILS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [NONNDRCALLDETAILS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(NONNDRCALLDETAILS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [NONNDRCALLDETAILS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [NONNDRCALLDETAILS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const filterData = context.getters.getMappedFilterValue;

        if (Object.values(filterData).every((value) => value.trim() == '')) {
            payload['isMountedLoad'] = 1;
        } else {
            payload['isMountedLoad'] = 0;
        }

        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const tempcurrentData = { data: null };
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETDATATABLEAPIDATA, tempcurrentData);
    },

    // For product/items details modal data
    // async [NONNDRCALLDETAILS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [NONNDRCALLDETAILS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [NONNDRCALLDETAILS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [NONNDRCALLDETAILS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSTOREID, payload);
    // },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [NONNDRCALLDETAILS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [NONNDRCALLDETAILS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(NONNDRCALLDETAILS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(NONNDRCALLDETAILS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [NONNDRCALLDETAILS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [NONNDRCALLDETAILS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [NONNDRCALLDETAILS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [NONNDRCALLDETAILS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [NONNDRCALLDETAILS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [NONNDRCALLDETAILS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [NONNDRCALLDETAILS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [NONNDRCALLDETAILS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(NONNDRCALLDETAILS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [NONNDRCALLDETAILS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(NONNDRCALLDETAILS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [NONNDRCALLDETAILS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [NONNDRCALLDETAILS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(NONNDRCALLDETAILS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [NONNDRCALLDETAILS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [NONNDRCALLDETAILS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(NONNDRCALLDETAILS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
