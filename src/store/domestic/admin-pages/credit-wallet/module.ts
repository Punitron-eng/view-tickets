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
        transaction_debit_amount: '',
        transaction_credit_amount: '',
        awb_no_logistics: '',
        airway_bill_no: '',
        transaction_date: {
            id: '',
            value: '',
            label: '',
        },
        paginatorStart: 0,
        paginatorLast: 10,
        searchInput: '',
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
const creditWallet = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default creditWallet;
