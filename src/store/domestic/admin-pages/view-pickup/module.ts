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
        awb_no_logistics: {
            id: [],
            value: [],
        },

        pickup_address: '',
        pickup_city: '',

        order_date: {
            id: '',
            value: '',
            label: '',
        },
        // token_number: {
        //     id: [],
        //     value: [],
        // },
        tracking_status: {
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
    storeDropdown: [],
    storeModalData: [],
    storeId: '',
};
const VIEWPICKUP = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default VIEWPICKUP;
