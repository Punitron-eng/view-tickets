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
    count: '',
    allFilterData: {
        vendor_code: '',
        user_company_name: '',
        user_email: '',
        user_mobile: '',
        user_created_date: {
            id: '',
            value: '',
            label: '',
        },
        last_order_date: {
            id: '',
            value: '',
            label: '',
        },
        delivery_type: {
            id: '',
            value: '',
        },
        user_account_type: {
            id: [],
            value: [],
        },
        user_status: {
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
const cpViewUser = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default cpViewUser;
