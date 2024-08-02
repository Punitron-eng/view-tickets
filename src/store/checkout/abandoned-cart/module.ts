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
        cart_id: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        checkout_stage: {
            id: [],
            value: [],
        },
        order_amount: '',
        order_product_quantity: '',
        order_customer_name: '',
        order_customer_mobile: '',
        order_customer_email: '',
        paginatorStart: 0,
        paginatorLast: 10,
        vendor_name: {
            id: [],
            value: [],
        },
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
    viewSaveFilteredData: [],
    responseMessage: '',
    storeDropdown: [],
    abandonedModalData: [],
    storeId: '',
};
const abandonedCart = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default abandonedCart;
