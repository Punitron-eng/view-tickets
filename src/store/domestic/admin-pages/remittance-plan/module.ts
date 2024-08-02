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
                remittance_plan_name: {
                    id: [],
                    value: [],
                },
                remittance_plan_date: {
                    id: '',
                    value: '',
                    label: '',
                },
                paginatorStart: 0,
                paginatorLast: 10,
                search: '',
                vendor_name: {
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
const remittancePlan = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default remittancePlan;
