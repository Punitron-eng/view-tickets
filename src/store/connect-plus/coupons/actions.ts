import { COUPONS } from './constants';
import { getVendorDataApi } from '@/api/VendorModalData';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, getRaiseModal, getEditModalData, viewDetailsData, imageUpload, riseDiscrepancyModel, rejectModal } from '@/api/domestic/weight-discrepancy/weightDiscrepancyApi';
const createActions = () => ({
    // For Export selected rows data
    [COUPONS.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [COUPONS.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(COUPONS.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(COUPONS.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload, context.getters.getDtToggleData);
        context.commit(COUPONS.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [COUPONS.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(COUPONS.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [COUPONS.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload, context.getters.getDtToggleData);
        const currentDatatableData = { data: null };
        context.commit(COUPONS.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // // For product/items details modal data
    // async [COUPONS.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
    //     const data = await productData(payload);
    //     context.commit(COUPONS.MUTATIONS.SETPRODUCTDETAILS, data);
    // },

    // // For store details
    // async [COUPONS.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
    //     const data = await viewDetailsData(payload);
    //     context.commit(COUPONS.MUTATIONS.SETSTOREDETAILS, data);
    // },

    // // For store Modal data
    // async [COUPONS.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
    //     const modalData = await storeModalData(payload);
    //     context.commit(COUPONS.MUTATIONS.SETSTOREMODALDATA, modalData);
    // },

    // // For store id
    // [COUPONS.ACTIONS.GETSTOREID](context: any, payload: any) {
    //     context.commit(COUPONS.MUTATIONS.SETSTOREID, payload);
    // },
    // ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [COUPONS.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [COUPONS.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(COUPONS.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(COUPONS.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [COUPONS.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [COUPONS.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [COUPONS.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(COUPONS.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [COUPONS.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(COUPONS.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [COUPONS.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(COUPONS.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [COUPONS.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [COUPONS.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(COUPONS.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [COUPONS.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(COUPONS.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [COUPONS.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(COUPONS.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [COUPONS.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(COUPONS.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(COUPONS.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [COUPONS.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(COUPONS.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [COUPONS.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(COUPONS.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [COUPONS.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(COUPONS.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [COUPONS.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(COUPONS.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    // async [COUPONS.ACTIONS.GETSKELETON](context: any, payload: any) {
    //     context.commit(COUPONS.MUTATIONS.SETSKELETON, payload);
    // },
    // async [COUPONS.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(COUPONS.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    // async [COUPONS.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
    //     const data = await imageUpload(payload);
    //     context.commit(COUPONS.MUTATIONS.SETIMAGEUPLOAD, data);
    // },
    // async [COUPONS.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(COUPONS.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [COUPONS.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(COUPONS.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },
});
export default createActions;
