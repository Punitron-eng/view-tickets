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
        invoice_id: '',
        order_id: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        invoice_date: {
            id: '',
            value: '',
            label: '',
        },
        tracking_status: {
            id: [],
            value: [],
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        search_awb_no: '',
        vendor_name: {
            id: [],
            value: [],
        },
    },
    page_count_billing: '',
    delivery_type: '0',
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
    storeModalData: [],
    storeId: '',
};
const notificationBilling = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default notificationBilling;
