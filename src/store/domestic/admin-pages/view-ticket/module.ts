import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    dtModal: {
        ViewDetailsModal: false,
        SelectCourierModal: false,
        VendorModal: false,
        VendorModalDatatable: false,
    },
    vendorData: [],
    DefaultColumn: [],
    editedColumnStatus: '', // For Customized Column
    dataTableSizePayload: '',
    vendorDataStatus: '',
    reverseData: '',
    count: '',
    ticketDepartmentId: '',
    allFilterData: {
        vendor_name: {
            id: [],
            value: [],
        },
        ticket_category: {
            id: [],
            value: [],
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        created_by: {
            id: [],
            value: [],
        },
        unactionable_by_itl: {
            id: [],
            value: [],
        },

        ticket_close_by: {
            id: [],
            value: [],
        },
        tracking_status: {
            id: [],
            value: [],
        },
        dispatch_count: {
            id: [],
            value: [],
        },
        ticket_department: {
            id: [],
            value: [],
        },
        carrier_name: {
            id: [],
            value: [],
        },
        ticket_assign_by: {
            id: [],
            value: [],
        },
        ticket_assign_to: {
            id: [],
            value: [],
        },
        closed_by: {
            id: [],
            value: [],
        },
        no_of_attempts: {
            id: [],
            value: [],
        },
        ticket_status: {
            id: [],
            value: [],
        },
        ticket_type: {
            id: [],
            value: [],
        },
        ticket_customer_type: {
            id: [],
            value: [],
        },
        clone_date: {
            id: '',
            value: '',
            label: '',
        },
        ticket_last_updated_date: {
            id: '',
            value: '',
            label: '',
        },
        ticket_due_date: {
            id: '',
            value: '',
            label: '',
        },
        order_edd: {
            id: '',
            value: '',
            label: '',
        },
        last_attempt_date: {
            id: '',
            value: '',
            label: '',
        },
        ticket_created_date: {
            id: '',
            value: '',
            label: '',
        },
        ticket_closed_date: {
            id: '',
            value: '',
            label: '',
        },

        ticket_ageing: '',
        pending_cs_remark: '',
        clone_ticket_id: '',
        ticket_lsp_remark: '',
        ticket_cs_remark: '',
        ticket_id: '',
        ticket_subject: '',

        paginatorStart: 0,
        paginatorLast: 10,
        search_awb_no: '',
    },
    dtToggleData: {
        pendingFromItl_pendingFromVendor: 'pending_from_itl',
    },
    tempAllFilterData: '',
    widgetTitleData: '',
    widgetValueData: '',
    exportPayload: '',
    saveFilterResponse: '',
    savedFilteredResponse: '',
    savedDatatableResponse: '',
    exportStatus: '',
    selectedCheckbox: [],
    productDetails: [],
    openModal: {
        filterModal: false,
        viewSaveFilterModal: false,
        SaveModal: false,
        UpdateModal: false,
        saveUpdateModal: false,
    },
    getRaiseModalData: '',
    isSkeleton: false,
    editVendorSubmitData: '',
    viewSaveFilteredData: [],
    responseMessage: '',
    storeDropdown: [],
    storeModalData: [],
    storeId: '',
    imageUploadData: [],
    raiseVendorSubmitData: '',
    rejectModalVal: '',
    viewDetailsData: '',
    chatTicketModalData: {}, // For Chat Ticket Modal
    chatMessageData: {}, // For Chat Message Data
    newTicketStatus: '', // For New Ticket
    currentChatCount: 1, // For current chat count
};
const newViewTicket = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default newViewTicket;
