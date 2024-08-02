import { NPS } from './constants';
import { getVendorDataApi } from '@/api/VendorModalData';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
const createActions = () => ({
    // For Export selected rows data
    [NPS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [NPS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NPS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(NPS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(NPS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [NPS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(NPS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [NPS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(NPS.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // // For product/items details modal data
    // async [NPS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(NPS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [NPS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(NPS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [NPS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(NPS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [NPS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(NPS.MUTATIONS.SETSTOREID, payload);
    // },
    // ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [NPS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [NPS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(NPS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(NPS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [NPS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [NPS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [NPS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(NPS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [NPS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(NPS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [NPS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(NPS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [NPS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [NPS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(NPS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [NPS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(NPS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [NPS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(NPS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [NPS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(NPS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(NPS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [NPS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(NPS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [NPS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(NPS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [NPS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(NPS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [NPS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(NPS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [NPS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(NPS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [NPS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(NPS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [NPS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(NPS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [NPS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(NPS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [NPS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(NPS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
