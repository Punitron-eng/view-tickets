import { NOTIFICATIONBILLING } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '../../../api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, widgetTitleData, widgetValueData } from '../../../api/connectPlusonboard/view-billing/ViewBillingApi';
import { getVendorDataApi } from '../../../api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [NOTIFICATIONBILLING.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [NOTIFICATIONBILLING.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NOTIFICATIONBILLING.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        console.log('this si the export syate 0', payload);
        await context.commit(NOTIFICATIONBILLING.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(context.getters.getExportValuePayload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [NOTIFICATIONBILLING.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [NOTIFICATIONBILLING.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        // context.commit(NOTIFICATIONBILLING.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For store id
    [NOTIFICATIONBILLING.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETSTOREID, payload);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [NOTIFICATIONBILLING.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [NOTIFICATIONBILLING.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(NOTIFICATIONBILLING.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(NOTIFICATIONBILLING.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [NOTIFICATIONBILLING.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [NOTIFICATIONBILLING.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [NOTIFICATIONBILLING.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [NOTIFICATIONBILLING.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [NOTIFICATIONBILLING.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [NOTIFICATIONBILLING.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [NOTIFICATIONBILLING.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [NOTIFICATIONBILLING.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(NOTIFICATIONBILLING.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [NOTIFICATIONBILLING.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(NOTIFICATIONBILLING.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [NOTIFICATIONBILLING.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [NOTIFICATIONBILLING.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [NOTIFICATIONBILLING.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        const getwidgetData = await widgetTitleData(payload.length);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    },
    async [NOTIFICATIONBILLING.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    },
    // For datatable data count
    async [NOTIFICATIONBILLING.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'notification-billing' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(NOTIFICATIONBILLING.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
});
export default createActions;
