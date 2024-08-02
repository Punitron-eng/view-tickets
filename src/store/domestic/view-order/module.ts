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
    allFilterData: {
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
        order_tags: '',
        order_customer_details: '',
        pickup_address: '',
        order_id: '',
        order_amount: '',
        duplicate_order: '',
        order_ndr_count: '',
        order_ageing_days: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        order_return_delivered_date: {
            id: '',
            value: '',
            label: '',
        },
        order_return_initiate_date: {
            id: '',
            value: '',
            label: '',
        },
        order_pickup_date: {
            id: '',
            value: '',
            label: '',
        },
        order_delivered_date: {
            id: '',
            value: '',
            label: '',
        },
        order_last_update_date: {
            id: '',
            value: '',
            label: '',
        },
        order_risk: {
            id: [],
            value: [],
        },
        order_buyer_intent: {},
        address_confirmation: '',
        order_confirmation: '',
        order_product_quantity: {
            id: [],
            value: [],
        },
        order_type: {
            id: [],
            value: [],
        },
        tracking_status: {
            id: [],
            value: [],
        },
        order_whatsapp_status: {
            id: [],
            value: [],
        },
        order_state: {
            id: [],
            value: [],
        },
        vendor_name: {
            id: [],
            value: [],
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        pickup_cutoff: {
            id: [],
            value: [],
        },
        no_of_attempts: {
            id: [],
            value: [],
        },
        order_edd: {
            id: [],
            value: [],
        },
        order_fulfillment: {
            id: [],
            value: [],
        },
        order_incorrect_address_status: {
            id: [],
            value: [],
        },
        order_source: {
            id: [],
            value: [],
        },
        is_oda: {
            id: [],
            value: [],
        },
        tracking_otp_cancelled: {
            id: [],
            value: [],
        },
        latest_courier_remark: {
            id: [],
            value: [],
        },
        order_weight: {
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
    selectedTab: '',
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
    dtTabChangeParams: false,
    storeId: '',
};
const viewOrder = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default viewOrder;

// Filter Type 5 ko  = {
//     id: '',
//     value: '',
//     label: '',
// },
// Filter Type 8 and 1 and 6  ko  = {
//     id: [],
//     value: [],
// },
