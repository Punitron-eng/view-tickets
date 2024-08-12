import { NEWVIEWTICKET } from './constants';
import { getDefaultColumnData, getSaveFilterData, saveFilterData, getPageCount, getDeleteUpdateFilterData, dataCount } from '@/api/datatable/dataTableApi';
import { dataTableData, exportBgProcess, productData, viewDetailsData, imageUpload, getChatTicketModalData, getChatTicketModalChatData, sendNewTicketData } from '../../../../api/domestic/view-ticket/viewTicketApi';
import { getVendorDataApi } from '@/api/VendorModalData';
const createActions = () => ({
    // For Export selected rows data
    [NEWVIEWTICKET.ACTIONS.GETSELECTEDROW](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSELECTEDROW, payload);
    },

    // For datatable data export
    async [NEWVIEWTICKET.ACTIONS.GETBILLINGEXPORT](context: any, payload: any) {
        // context.commit(NEWVIEWTICKET.MUTATIONS.SETSELECTEDTABNAME, payload.selectedTab);
        await context.commit(NEWVIEWTICKET.MUTATIONS.SETBILLINGEXPORT, payload);
        const data = await exportBgProcess(payload, context.getters.getMappedFilterPayload, context.getters.getExportValuePayload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETEXPORTSTATUS, data);
    },

    //for datatable action modals
    [NEWVIEWTICKET.ACTIONS.UPDATEDTMODAL](context, { modalName, visibility }) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDTMODAL, { modalName, visibility });
    },

    // For datatable data
    async [NEWVIEWTICKET.ACTIONS.GETDATATABLEAPIDATA](context: any, payload: any) {
        const currentDatatableData = await dataTableData(payload, context.getters.getMappedFilterPayload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDATATABLEAPIDATA, currentDatatableData);
    },

    // For datatable data count
    async [NEWVIEWTICKET.ACTIONS.GETDATATABLEAPIDATACOUNT](context: any, payload: any) {
        const updatedPayload = { ...payload, moduleUrl: 'support-ticket' };
        const currentDatatableData = await dataCount(updatedPayload, context.getters.getMappedFilterPayload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDATATABLEAPIDATACOUNT, currentDatatableData);
    },

    // For product/items details modal data
    async [NEWVIEWTICKET.ACTIONS.GETPRODUCTDETAILS](context: any, payload: any) {
        const data = await productData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETPRODUCTDETAILS, data);
    },

    // For store details
    async [NEWVIEWTICKET.ACTIONS.GETSTOREDETAILS](context: any, payload: any) {
        const data = await viewDetailsData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSTOREDETAILS, data);
    },

    // For store Modal data
    async [NEWVIEWTICKET.ACTIONS.GETSTOREMODALDATA](context: any, payload: any) {
        const modalData = await storeModalData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSTOREMODALDATA, modalData);
    },

    // For store id
    [NEWVIEWTICKET.ACTIONS.GETSTOREID](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSTOREID, payload);
    },
    ////////////////////////////////////////////////////////// datatable actions ///////////////////////////////////////////////////////////

    // For datatable start page count
    [NEWVIEWTICKET.ACTIONS.GETPAGINATORSTART](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETPAGINATORSTART, payload);
    },

    // For datatable last/length page count
    async [NEWVIEWTICKET.ACTIONS.GETPAGINATORLAST](context: any, payload: any) {
        const pageCountData = await getPageCount(payload);
        if (pageCountData.page_count) {
            context.commit(NEWVIEWTICKET.MUTATIONS.SETPAGINATORLAST, pageCountData);
        } else {
            context.commit(NEWVIEWTICKET.MUTATIONS.SETPAGINATORLAST, payload.payload);
        }
    },

    // For global date range
    [NEWVIEWTICKET.ACTIONS.GETDATERANGE](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDATERANGE, payload);
    },

    // For global search in datatable
    [NEWVIEWTICKET.ACTIONS.GETORDERINPUT](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETORDERINPUT, payload);
    },

    // For datatable vendor data
    async [NEWVIEWTICKET.ACTIONS.GETVENDORMODALDATA](context: any, payload: any) {
        const getvendorData = await getVendorDataApi(payload.limit, payload.start, payload.searchVendorName, payload.inputType);
        const data = {
            getvendorData: getvendorData,
            isVendorSearch: payload.isVendorSearch,
        };
        context.commit(NEWVIEWTICKET.MUTATIONS.SETVENDORMODALDATA, data);
    },

    // For datatable columns
    async [NEWVIEWTICKET.ACTIONS.GETDEFAULTCOLUMN](context: any, payload: any) {
        if (context.getters.getTicketDepartmentId) {
            payload.payload.ticket_department = context.getters.getTicketDepartmentId;
        }

        if (context.getters.getVendorValues.id.length) {
            payload.payload.vendor_name = context.getters.getVendorValues.id;
        }
        const defaultColumn = await getDefaultColumnData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDEFAULTCOLUMN, defaultColumn);
    },

    // For datatable edit columns
    async [NEWVIEWTICKET.ACTIONS.GETEDITEDCOLUMNSDATA](context: any, payload: any) {
        const columnData = await getDefaultColumnData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETEDITEDCOLUMNSDATA, columnData);
    },

    // For datatable columnpayload on mounted
    [NEWVIEWTICKET.ACTIONS.GETDATATABLESIZE](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETDATATABLESIZE, payload);
    },

    // For get Save filter Data
    async [NEWVIEWTICKET.ACTIONS.GETSAVEFILTERDATA](context: any, payload: any) {
        const saveFilterRespo = await getSaveFilterData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETVIEWSAVEDFILTEREDDATA, saveFilterRespo);
    },

    // For datatable reset vendor data
    async [NEWVIEWTICKET.ACTIONS.RESETVENDORDATA](context: any) {
        await context.commit(NEWVIEWTICKET.MUTATIONS.UPDATEVENDORDATA);
    },

    // For  datatable savefilter, viewfiltes, open modal
    async [NEWVIEWTICKET.ACTIONS.UPDATEOPENMODAL](context: any, payload: any) {
        await context.commit(NEWVIEWTICKET.MUTATIONS.SETOPENMODAL, payload);
    },

    // For Update datatable saveFilter data
    async [NEWVIEWTICKET.ACTIONS.GETUPDATEFILTERDATA](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETUPDATEFILTERDATA, payload);
        const saveFilterRespo = await saveFilterData(payload, context.getters.getUpdatefilterPayload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSAVEFILTERDATA, saveFilterRespo);
    },

    // For datatbale delete savefilter
    async [NEWVIEWTICKET.ACTIONS.GETUPDATEDELETEFILTERARRAY](context: any, payload: any) {
        const data = await getDeleteUpdateFilterData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETUPDATEDELETEFILTERARRAY, data);
    },
    // For datatable widgets
    // async [NEWVIEWTICKET.ACTIONS.GETWIDGETTITLEDATA](context: any, payload: any) {
    //     const getwidgetData = await widgetTitleData(payload.length);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETWIDGETTITLEDATA, getwidgetData.all_widgets_data_array);
    // },
    // async [NEWVIEWTICKET.ACTIONS.GETWIDGETVALUEDATA](context: any, payload: any) {
    //     const temppayload = { length: payload.length, isMountedLoad: '' };
    //     const filterData = context.getters.getMappedFilterValue;
    //     if (Object.values(filterData).every((value) => value.trim() == '')) {
    //         temppayload.isMountedLoad = '1';
    //     } else {
    //         temppayload.isMountedLoad = '0';
    //     }
    //     const getWidgetValue = await widgetValueData(temppayload, context.getters.getMappedFilterPayload);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETWIDGETVALUEDATA, getWidgetValue.all_widgets_data_array);
    // },
    // async [NEWVIEWTICKET.ACTIONS.GETRAISEMODALDATA](context: any, payload: any) {
    //     const data = await getRaiseModal(payload);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETRAISEMODALDATA, data);
    // },
    async [NEWVIEWTICKET.ACTIONS.GETSKELETON](context: any, payload: any) {
        context.commit(NEWVIEWTICKET.MUTATIONS.SETSKELETON, payload);
    },
    // async [NEWVIEWTICKET.ACTIONS.GETEDITDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await getEditModalData(payload);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETEDITDISCREPANCYDATA, data);
    // },
    async [NEWVIEWTICKET.ACTIONS.GETIMAGEUPLOAD](context: any, payload: any) {
        const data = await imageUpload(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETIMAGEUPLOAD, data);
    },
    // async [NEWVIEWTICKET.ACTIONS.GETRISEDISCREPANCYDATA](context: any, payload: any) {
    //     const data = await riseDiscrepancyModel(payload);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETRISEDISCREPANCYDATA, data);
    // },
    // async [NEWVIEWTICKET.ACTIONS.GETREJECTMODALDATA](context: any, payload: any) {
    //     const columnData = await rejectModal(payload);
    //     context.commit(NEWVIEWTICKET.MUTATIONS.SETREJECTMODALDATA, columnData);
    // },

    // chat Ticket Modal actions
    async [NEWVIEWTICKET.ACTIONS.GETCHATTICKETMODALDATA](context: any, payload: any) {
        const data = await getChatTicketModalData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETCHATTICKETMODALDATA, data);
    },
    // chat Ticket Modal get Chats data
    async [NEWVIEWTICKET.ACTIONS.GETCHATMESSAGEDATA](context: any, payload: any) {
        const { selectedTicketId, currentChatCount } = payload;
        context.state.currentChatCount = currentChatCount;
        const data = await getChatTicketModalChatData(selectedTicketId, currentChatCount);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETCHATMODALCHATSDATA, data);
    },
    // for new ticket
    async [NEWVIEWTICKET.ACTIONS.GETNEWTICKETDATA](context: any, payload: any) {
        const data = await sendNewTicketData(payload);
        context.commit(NEWVIEWTICKET.MUTATIONS.SETNEWTICKETSTATUS, data);
    },
});
export default createActions;
