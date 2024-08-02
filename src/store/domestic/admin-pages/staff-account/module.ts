import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    //datatable variables
        dtModal: {
            VendorModal: false,
            VendorModalDatatable: false,
        },
        vendorData: [],
        DefaultColumn: [],
        editedColumnStatus: '', // For Customized Column
        dataTableSizePayload: '',
        vendorDataStatus: '',
        reverseData: '',
        //datatable filter variables
            allFilterData: {
                paginatorStart: 0,
                paginatorLast: 10,
                searchInput:'',
                vendor_name: {
                    id: [],
                    value: [],
                },
                user_name: '',
                user_email: '',
                user_mobile: '',
                user_status: {
                    id: [],
                    value: [],
                },
            },
        //datatable filter variables
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
    //datatable variables
};
const staffAccount = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default staffAccount;
