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
        vendor_name: {
            id: [],
            value: [],
        },
        order_id: '',
        ndr_last_action: {
            id: [],
            value: [],
        },
        ndr_last_action_remark: {
            id: [],
            value: [],
        },
        ndr_date: {
            id: '',
            value: '',
            label: '',
        },
        order_amount: '',
        awb_no_logistics: {
            id: [],
            value: [],
        },
        order_type: {
            id: [],
            value: [],
        },
        order_product_quantity: '',
        order_customer_details: '',
        no_of_attempts: {
            id: [],
            value: [],
        },
        ndr_response: {
            id: [],
            value: [],
        },
        ndr_escalation_status: {
            id: [],
            value: [],
        },
        ndr_status: {
            id: [],
            value: [],
        },
        tracking_status: {
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
const viewNdr = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default viewNdr;
