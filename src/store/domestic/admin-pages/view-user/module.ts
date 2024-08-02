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
        vendor_code: '',
        user_company_name: '',
        user_email: '',
        user_mobile: '',
        total_user_credit_amount: '',
        total_user_wallet_amount: '',
        user_created_date: {
            id: '',
            value: '',
            label: '',
        },
        user_last_login_date: {
            id: '',
            value: '',
            label: '',
        },
        user_type: {
            id: [],
            value: [],
        },
        user_enabled: {
            id: [],
            value: [],
        },
        delivery_type: {
            id: [],
            value: [],
        },
        user_status: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
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
};
const adminViewUser = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default adminViewUser;
