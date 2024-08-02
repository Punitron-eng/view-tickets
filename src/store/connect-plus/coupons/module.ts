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
        created_date: {
            id: '',
            value: '',
            label: '',
        },
        coupon_type: {
            id: [],
            value: [],
        },
        order_amount: '',
        min_order_value: '',
        total_discount: '',
        coupon_status: {
            id: [],
            value: []
        },
        vendor_name: {
            id: [],
            value: [],
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
