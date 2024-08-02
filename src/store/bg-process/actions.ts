import { BGPROCESS } from './constants';
import { getVendorDataApi } from '@/api/VendorModalData';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
const createActions = () => ({
    // For Export selected rows data
    [BGPROCESS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [BGPROCESS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(BGPROCESS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(BGPROCESS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(BGPROCESS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [BGPROCESS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(BGPROCESS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [BGPROCESS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(BGPROCESS.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // // For product/items details modal data
    // async [BGPROCESS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [BGPROCESS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [BGPROCESS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [BGPROCESS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(BGPROCESS.MUTATIONS.SETSTOREID, payload);
    // },
    // ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [BGPROCESS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [BGPROCESS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(BGPROCESS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(BGPROCESS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [BGPROCESS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [BGPROCESS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [BGPROCESS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(BGPROCESS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [BGPROCESS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(BGPROCESS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [BGPROCESS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(BGPROCESS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [BGPROCESS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [BGPROCESS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(BGPROCESS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [BGPROCESS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(BGPROCESS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [BGPROCESS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(BGPROCESS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [BGPROCESS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(BGPROCESS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(BGPROCESS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [BGPROCESS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(BGPROCESS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [BGPROCESS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(BGPROCESS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [BGPROCESS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(BGPROCESS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [BGPROCESS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [BGPROCESS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(BGPROCESS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [BGPROCESS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [BGPROCESS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [BGPROCESS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [BGPROCESS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(BGPROCESS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
