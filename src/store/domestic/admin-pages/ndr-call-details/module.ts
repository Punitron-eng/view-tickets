import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    dtModal: {
        // ViewDetailsModal: false,
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
        order_product_quantity: '',
        order_amount: '',
        order_id: '',
        order_type: {
            id: [],
            value: [],
        },
        vendor_name: {
            id: [],
            value: [],
        },
        sub_admin_name: {
            id: [],
            value: [],
        },

        awb_no_logistics: {
            id: [],
            value: [],
        },

        calling_status: {
            id: [],
            value: [],
        },
        order_date: {
            id: '',
            value: '',
            label: '',
        },

        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
    },
    tempAllFilterData: '',
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
    getRaiseModalData: '',
    isSkeleton: false,
    editVendorSubmitData: '',
    viewSaveFilteredData: [],
    responseMessage: '',
    storeDropdown: [],
    storeModalData: [],
    storeId: '',
    imageUploadData: [],
    raiseVendorSubmitData: '',
    rejectModalVal: '',
    viewDetailsData: '',
};
const ndrCallDetails = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default ndrCallDetails;
