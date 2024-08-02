import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    dtModal: {
        // ViewDetailsModal: false,
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
        vendor_name: {
            id: [],
            value: [],
        },
        order_id: '',
        order_product_quantity: '', // items
        order_customer_details: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        order_cancel_request_date: {
            id: '',
            value: '',
            label: '',
        },
        order_rto_request_date: {
            id: '',
            value: '',
            label: '',
        },
        order_pod_request_date: {
            id: '',
            value: '',
            label: '',
        },
        order_amount: '',
        order_type: {
            // payment
            id: [],
            value: [],
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        order_cancel_status: {
            id: [],
            value: [],
        },
        order_cancel_request_status: {
            id: [],
            value: [],
        },
        order_rto_request_status: {
            id: [],
            value: [],
        },
        order_pod_request_status: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
    },
    tempAllFilterData: '',
    newFormattedSaveFilterPayload: '',
    // widgetTitleData: '',
    // widgetValueData: '',
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
    viewSaveFilteredData: [],
    responseMessage: '',
    storeDropdown: [],
    storeModalData: [],
    storeId: '',
};
const viewCancelRtoPodReq = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default viewCancelRtoPodReq;
