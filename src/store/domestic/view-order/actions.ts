import { VIEWORDER } from './constants';
import { getDefaultColumnData, getSaveFilterData, getPageCount, getDeleteUpdateFilterData, saveFilterData, dataCount } from '@/api/datatable/dataTableApi';
import { storeDropdownDetails, dataTableData, exportBgProcess } from '../../../api/domestic/view-order/viewOrderApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For datatable start page count
    [VIEWORDER.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETPAGINATORSTART, payload);
    },
    // For datatable last/length page count
    async [VIEWORDER.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(VIEWORDER.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(VIEWORDER.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },
    // For global date range
    [VIEWORDER.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETDATERANGE, payload);
    },
    // For global search in datatable
    [VIEWORDER.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETORDERINPUT, payload);
    },
    // For datatable vendor data
    async [VIEWORDER.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(VIEWORDER.MUTATIONS.SETVENDORMODALDATA, data);
    },
    // For datatable columns
    async [VIEWORDER.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        let data = {};
        if (payload.payload.tab_name === 'store_order') {
            data = { ...payload.payload, platform_id: 2, store_id: 9210 };
        }
        const defaultColumn = await getDefaultColumnData(payload.payload.tab_name === 'store_order' ? { payload: data, url: payload.url } : payload);
        context.commit(VIEWORDER.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },
    // For datatable edit columns
    async [VIEWORDER.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(VIEWORDER.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },
    // For datatable columnpayload on mounted
    [VIEWORDER.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETDATATABLESIZE, payload);
    },
    // For get Save filter Data
    async [VIEWORDER.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        let data = {};
        if (payload.payload.tab_name === 'store_order') {
            data = { ...payload.payload, platform_id: 2, store_id: 9210 };
        }
        const saveFilterRespo = await getSaveFilterData(payload.payload.tab_name === 'store_order' ? { payload: data, url: payload.url } : payload);
        context.commit(VIEWORDER.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },
    // For datatable reset vendor data
    async [VIEWORDER.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(VIEWORDER.MUTATIONS.UPDATEVENDORDATA);
    },
    // For  datatable savefilter, viewfiltes, open modal
    async [VIEWORDER.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(VIEWORDER.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [VIEWORDER.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(VIEWORDER.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },
    // For datatbale delete savefilter
    async [VIEWORDER.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(VIEWORDER.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    async [VIEWORDER.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
        // const getwidgetData = await widgetTitleData(payload.length);
        context.commit(VIEWORDER.MUTATIONS.SETWIDGETTITLEDATA, {
            all_widgets_data_array: {
                '0': {
                    name: 'TOTAL DISCREPANCY',
                },
                '1': {
                    name: 'APPROVED DISCREPANCY',
                },
                '2': {
                    name: 'REJECTED DISCREPANCY',
                },
                '3': {
                    name: 'AUTO ACCEPTED DISCREPANCY',
                },
            },
            status: 'success',
        });
    },

    async [VIEWORDER.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
        // const getWidgetValue = await widgetValueData(payload.length, context.getters.getMappedFilterPayload);
        context.commit(VIEWORDER.MUTATIONS.SETWIDGETVALUEDATA, {
            status: 'success',
            all_widgets_data_array: {
                '0': {
                    value: Math.floor(Math.random() * 10),
                    percentage: '0%',
                    isWidgetUpArrow: '',
                },
                '1': {
                    value: '0',
                    percentage: '0%',
                    isWidgetUpArrow: '',
                },
                '2': {
                    value: '0',
                    percentage: '0%',
                    isWidgetUpArrow: '',
                },
                '3': {
                    value: '0',
                    percentage: '0%',
                    isWidgetUpArrow: '',
                },
            },
        });
    },
    ////////////////////////////////////////////////////////// datatable actions  above ///////////////////////////////////////////////////////////
    // For Export selected rows data
    [VIEWORDER.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETSELECTEDROW, payload);
    },
    // For datatable data export
    async [VIEWORDER.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NEWVIEWTICKET.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(VIEWORDER.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(payload, context.getters.getMappedFilterPayload, context.getters.getExportValuePayload);
        context.commit(VIEWORDER.MUTATIONS.SETEXPORTSTATUS, data);
    },
    //for datatable action modals
    [VIEWORDER.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(VIEWORDER.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },
    // For datatable data
    async [VIEWORDER.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(VIEWORDER.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },
    // For product/items details modal data
    async [VIEWORDER.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(VIEWORDER.MUTATIONS.SETPRODUCTDETAILS, data);
    },
    // For store details
    async [VIEWORDER.ACTIONS.GETSTOREDETAILS](context: any) {
        const data = await storeDropdownDetails();
        context.commit(VIEWORDER.MUTATIONS.SETSTOREDETAILS, data);
    },
    // For store Modal data
    async [VIEWORDER.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
        const modalData = await storeModalData(payload);
        context.commit(VIEWORDER.MUTATIONS.SETSTOREMODALDATA, modalData);
    },
    // For store id
    [VIEWORDER.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(VIEWORDER.MUTATIONS.SETSTOREID, payload);
    },
    // For datatable data count
    async [VIEWORDER.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'support-ticket' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(VIEWORDER.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },
});
export default createActions;
