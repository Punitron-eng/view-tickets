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
    allFilterData: {
        order_product_quantity: '',
        order_id: '',
        order_amount: '',
        order_refund_amount: '',
        order_customer_name: '',
        order_customer_mobile: '',
        order_customer_email: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        return_requested_date: {
            id: '',
            value: '',
            label: '',
        },
        return_rejected_date: {
            id: '',
            value: '',
            label: '',
        },
        tracking_status: {
            id: [],
            value: [],
        },
        order_type: {
            id: [],
            value: [],
        },

        awb_no_logistics: {
            id: [],
            value: [],
        },
        order_return_reason: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        search_awb_no: '',
        delivery_warehouse: {
            id: '',
            value: '',
        },
        origin_warehouse: {
            id: '',
            value: '',
        },
        vendor_name: {
            id: [],
            value: [],
        },
    },
    tempAllFilterData: '',
    newFormattedSaveFilterPayload: '',

    widgetTitleData: '',
    widgetValueData: '',
    exportPayload: '',
    saveFilterResponse: '',
    savedFilteredResponse: '',
    savedDatatableResponse: '',
    exportStatus: '',
    selectedCheckbox: [],
    openModal: {
        filterModal: false,
        viewSaveFilterModal: false,
        SaveModal: false,
        UpdateModal: false,
        saveUpdateModal: false,
    },
    viewSaveFilteredData: [],

    // ------------------------------------------------------------------------------------ DATATABLE MODULE ABOVE --------------------------------------------------

    dtToggleData: {
        pending_complete: 'pending',
        requested_rejected: 'requested',
    },
    productDetails: [],
    selectedTab: '',
    dataTableTabs: [],
    viewDetailsData: '',
    rejectData: '',
    picknowData: '',
    cancelOrderData: '',
    picknowSubmitData: '',
    viewDetailActivityModal: [],
    dtTabChangeParams: false,
    stripWarehouse: [],
    picknowWarehouseData: '',
    cityState: '',
    getWeightApiData: '',
    ExportCountData: '',
    responseMessage: '',
};
const returnFlow = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default returnFlow;
