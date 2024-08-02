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
        user_website: '',
        user_spd: '',
        onboard_user_actual_spd: '',
        vendor_name_details: '',
        onboard_user_web_remark: '',
        onboard_user_app_remark: '',
        user_wallet_amount: '',
        calling_date: {
            id: '',
            value: '',
            label: '',
        },
        next_calling_date: {
            id: '',
            value: '',
            label: '',
        },
        user_signup_date: {
            id: '',
            value: '',
            label: '',
        },
        user_modified_date: {
            id: '',
            value: '',
            label: '',
        },
        user_utm_source: '',
        delivery_type: {
            id: [],
            value: [],
        },
        user_onboard_steps: {
            id: [],
            value: [],
        },
        sub_admin_name: {
            id: [],
            value: [],
        },
        onboard_calling_status: {
            id: [],
            value: [],
        },
        onboard_calling_sub_status: {
            id: [],
            value: [],
        },
        onboard_user_status: {
            id: [],
            value: [],
        },

        onboard_lead_type: {
            id: [],
            value: [],
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
const onboardUser = () => ({
    namespaced: true,
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default onboardUser;
