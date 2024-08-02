import { CODTOPREPAID } from './constants';
import { getVendorDataApi } from '@/api/VendorModalData';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
const createActions = () => ({
    // For Export selected rows data
    [CODTOPREPAID.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [CODTOPREPAID.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(CODTOPREPAID.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(CODTOPREPAID.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(CODTOPREPAID.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [CODTOPREPAID.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(CODTOPREPAID.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [CODTOPREPAID.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(CODTOPREPAID.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // // For product/items details modal data
    // async [CODTOPREPAID.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [CODTOPREPAID.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [CODTOPREPAID.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [CODTOPREPAID.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(CODTOPREPAID.MUTATIONS.SETSTOREID, payload);
    // },
    // ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [CODTOPREPAID.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [CODTOPREPAID.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(CODTOPREPAID.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(CODTOPREPAID.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [CODTOPREPAID.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [CODTOPREPAID.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [CODTOPREPAID.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(CODTOPREPAID.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [CODTOPREPAID.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(CODTOPREPAID.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [CODTOPREPAID.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(CODTOPREPAID.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [CODTOPREPAID.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [CODTOPREPAID.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(CODTOPREPAID.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [CODTOPREPAID.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(CODTOPREPAID.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [CODTOPREPAID.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(CODTOPREPAID.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [CODTOPREPAID.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(CODTOPREPAID.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(CODTOPREPAID.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [CODTOPREPAID.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(CODTOPREPAID.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [CODTOPREPAID.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [CODTOPREPAID.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [CODTOPREPAID.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [CODTOPREPAID.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(CODTOPREPAID.MUTATIONS.SETSKELETON, payload);
    // },
    // async [CODTOPREPAID.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [CODTOPREPAID.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [CODTOPREPAID.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [CODTOPREPAID.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(CODTOPREPAID.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
