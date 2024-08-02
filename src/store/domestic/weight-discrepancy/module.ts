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
        order_id: '',
        weight_discrepancy_date: {
            id: '',
            value: '',
            label: '',
        },
        weight_dispute_date: {
            id: '',
            value: '',
            label: '',
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        weight_discrepancy_status: {
            id: [],
            value: [],
        },
        order_amount: '',
        order_product_quantity: '',
        paginatorStart: 0,
        paginatorLast: 10,
        search_awb_no: '',
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
const weightDiscrepancy = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default weightDiscrepancy;
