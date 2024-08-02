import createActions from './actions';
import createMutations from './mutations';
import createGetters from './getters';
const state: any = {
    defaultColumn: null,
    reverseData: '',
    selectedTab: '',
    dataTableSizePayload: '',
    savedDatatableResponse: '',
    exportStatus: '',
    saveFilterResponse: '',
    viewSaveFilteredData: [],
    vendorData: [],
    vendorDataStatus: '',
    allFilterData: {
        items: '',
        order_id: '',
        amount: '',
        refund_amount: '',
        customer: '',
        order_date: {
            id: '',
            value: '',
            label: '',
        },
        requested_date: {
            id: '',
            value: '',
            label: '',
        },
        rejected_date: {
            id: '',
            value: '',
            label: '',
        },
        dt_status: {
            id: [],
            value: [],
        },
        payment: {
            id: [],
            value: [],
        },

        awb_no: {
            id: [],
            value: [],
        },
        return_reason: {
            id: [],
            value: [],
        },
        paginatorStart: 0,
        paginatorLast: 10,
        search: '',
        delivery_warehouse: {
            id: [],
            value: [],
        },
        origin_warehouse: {
            id: [],
            value: [],
        },
        vendor_name: {
            id: [],
            value: [],
        },
    },
};
const dataTableState = () => ({
    state,
    mutations: createMutations(),
    actions: createActions(),
    getters: createGetters(),
});
export default dataTableState;
