import { NDRCALLDETAILS } from './constants';
import { getVendorDataApi } from '@/api/VendorModalData';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
const createActions = () => ({
    // For Export selected rows data
    [NDRCALLDETAILS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [NDRCALLDETAILS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NDRCALLDETAILS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(NDRCALLDETAILS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [NDRCALLDETAILS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [NDRCALLDETAILS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(NDRCALLDETAILS.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // // For product/items details modal data
    // async [NDRCALLDETAILS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [NDRCALLDETAILS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [NDRCALLDETAILS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [NDRCALLDETAILS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETSTOREID, payload);
    // },
    // ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [NDRCALLDETAILS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [NDRCALLDETAILS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(NDRCALLDETAILS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(NDRCALLDETAILS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [NDRCALLDETAILS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [NDRCALLDETAILS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [NDRCALLDETAILS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(NDRCALLDETAILS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [NDRCALLDETAILS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [NDRCALLDETAILS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [NDRCALLDETAILS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [NDRCALLDETAILS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [NDRCALLDETAILS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(NDRCALLDETAILS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [NDRCALLDETAILS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(NDRCALLDETAILS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [NDRCALLDETAILS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(NDRCALLDETAILS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [NDRCALLDETAILS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(NDRCALLDETAILS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [NDRCALLDETAILS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [NDRCALLDETAILS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(NDRCALLDETAILS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
