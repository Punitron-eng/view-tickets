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
        vendor_name: {
            id: [],
            value: [],
        },
        awb_no_logistics: {
            id: [],
            value: [],
        },
        nps_score: {
            id: [],
            value: [],
        },
        order_customer_details: '',
        order_id: '',
        nps_remarks: '',

        order_date: {
            id: '',
            value: '',
            label: '',
        },
        order_delivered_date: {
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
const nps = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default nps;
