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
        awb_no_logistics: {
            id: [],
            value: [],
        },
        pincode_pickup_available: {
            id: [],
            value: [],
        },
        pincode_cod_available: {
            id: [],
            value: [],
        },
        pincode_prepaid_available: {
            id: [],
            value: [],
        },
        pincode_status: {
            id: [],
            value: [],
        },
        pincode: '',
        pincode_hub_name: '',
        pincode_area: '',
        pincode_state: '',
        pincode_city: '',
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
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
const pincode = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default pincode;
