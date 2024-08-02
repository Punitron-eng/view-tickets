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
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
        tags: '',
        order_customer_details: '',
        pickup_address: '',
        order_id: '',
        order_amount: '',
        duplicate_order: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        return_delivered_date: {
            id: '',
            value: '',
            label: '',
        },
        order_pickup_date: {
            id: '',
            value: '',
            label: '',
        },
        order_edd: {
            id: '',
            value: '',
            label: '',
        },
        return_initiate_date: {
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
        risk: {
            id: [],
            value: [],
        },
        order_product_quantity: '',
        order_type: {
            id: [],
            value: [],
        },
        tracking_otp_cancelled: {
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
        tracking_status_intl: {
            id: [],
            value: [],
        },
        no_of_attempts: {
            id: [],
            value: [],
        },

        order_fulfillment: {
            id: [],
            value: [],
        },
        buyer_intent: {
            id: [],
            value: [],
        },
        latest_courier_remark: {
            id: [],
            value: [],
        },
        order_country: {
            id: [],
            value: [],
        },
        order_duties: {
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
const viewOrderIntl = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default viewOrderIntl;

// Filter Type 5 ko  = {
//     id: '',
//     value: '',
//     label: '',
// },
// Filter Type 8 and 1 and 6  ko  = {
//     id: [],
//     value: [],
// },
