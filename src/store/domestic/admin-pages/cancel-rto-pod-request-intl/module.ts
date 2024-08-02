import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    vendorData: [],
    DefaultColumn: [],
    editedColumnStatus: '', // For Customized Column
    dataTableSizePayload: '',
    vendorDataStatus: '',
    reverseData: '',
    allFilterData: {
        order_id: '',
        order_amount: '',
        order_product_quantity: '',
        order_customer_details: '',
        cancel_refund_amount: '',
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
        awb_no_logistics: {
            id: [],
            value: [],
        },
        order_type: {
            // payment
            id: [],
            value: [],
        },
        order_cancel_request_status: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
        vendor_name: {
            id: [],
            value: [],
        },
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
};
const cancelRtoPodReqIntl = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default cancelRtoPodReqIntl;
